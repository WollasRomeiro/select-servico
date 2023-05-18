import { Injectable } from '@nestjs/common';
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

  create(createWorkerDto: CreateWorkerDto) {
    return this.repository.create(createWorkerDto);
  }

  findAll() {
    return `This action returns all worker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
