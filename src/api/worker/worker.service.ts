import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';
import { IPaginationMeta, IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { SelectWorkerDto } from './dto/select-worker.dto';
import { WorkerFilter } from './dto/worker-filter.dto';
import { publishWroker } from 'util/publish/workerPublish';

@Injectable()
export class WorkerService {
  constructor(@InjectRepository(Worker) public readonly repository: Repository<Worker>) {}

  async create(createWorkerDto: CreateWorkerDto) {
    try {
      const data = await this.repository.save(createWorkerDto);

      publishWroker(createWorkerDto);
      return data;
    } catch (error) {
      if (error && error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(error.sqlMessage);
      } else if (error && error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(error.sqlMessage);
      } else if (error && error.code === '23503') {
        throw new BadRequestException(error.detail);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async findAll(workerFilter: WorkerFilter, paginationOptions: IPaginationOptions): Promise<Pagination<SelectWorkerDto>> {
    const { name } = workerFilter;
    const query = this.repository.createQueryBuilder('worker').select().orderBy('worker.id', 'DESC');

    if (name) {
      query.andWhere('worker.name ILIKE :name', { name: `${name}%` });
    }

    const results = await paginate<Worker>(query, paginationOptions);
    const items = results.items.map((result) => new SelectWorkerDto(result));

    return new Pagination<SelectWorkerDto>(items, results.meta);
  }

  async findOne(id: number) {
    const worker: Worker = await this.repository.findOneBy({ id });

    if (!worker) {
      throw new NotFoundException('Worker not found');
    }

    return worker;
  }

  async update(id: number, updateWorkerDto: UpdateWorkerDto) {
    const worker: Worker = await this.findOne(id);
    await this.repository.update(id, updateWorkerDto);

    return Object.assign({}, worker, updateWorkerDto);
  }

  async remove(id: number) {
    const worker: Worker = await this.findOne(id);
    return this.repository.remove(worker);
  }
}
