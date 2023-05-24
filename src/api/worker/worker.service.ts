import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from './entities/worker.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker) public readonly repository: Repository<Worker>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    try {
      const data = await this.repository.save(createWorkerDto);
      return data;
    } catch (error) {
      if (error && error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(error.sqlMessage);
      } else if (error && error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(error.sqlMessage);
      } else if (error && error.code === '23503') {
        throw new BadRequestException(error.detail);
      }

      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Worker[]> {
    return this.repository.find();
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
