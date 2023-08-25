import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfissionDto } from './dto/create-profission.dto';
import { UpdateProfissionDto } from './dto/update-profission.dto';
import { Profission } from './entities/profission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { SelectProfissionDto } from './dto/select-profission.dto';

@Injectable()
export class ProfissionService {
  constructor(
    @InjectRepository(Profission)
    public readonly repository: Repository<Profission>,
  ) {}
  async create(createProfissionDto: CreateProfissionDto) {
    try {
      const data = await this.repository.save(createProfissionDto);
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

  async findAll(paginationOptions: IPaginationOptions): Promise<Pagination<SelectProfissionDto>> {
    const query = this.repository.createQueryBuilder('profission').select().orderBy('profission.id', 'DESC');

    const results = await paginate<Profission>(query, paginationOptions);
    const items = results.items.map((result) => new SelectProfissionDto(result));

    return new Pagination<SelectProfissionDto>(items, results.meta);
  }

  async findOne(id: number) {
    const profission: Profission = await this.repository.findOneBy({ id });

    if (!profission) {
      throw new NotFoundException('Profission not found');
    }

    return profission;
  }

  async update(id: number, updateProfissionDto: UpdateProfissionDto) {
    const profission: Profission = await this.findOne(id);
    await this.repository.update(id, updateProfissionDto);

    return Object.assign({}, profission, updateProfissionDto);
  }

  async remove(id: number) {
    const profission: Profission = await this.findOne(id);
    return this.repository.remove(profission);
  }
}
