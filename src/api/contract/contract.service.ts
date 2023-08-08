import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    public readonly repository: Repository<Contract>,
  ) {}
  async create(createContractDto: CreateContractDto) {
    try {
      const data = await this.repository.save(createContractDto);
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

  findAll(): Promise<Contract[]> {
    return this.repository.find();
  }

  async findOne(id: number) {
    const contract: Contract = await this.repository.findOneBy({ id });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const contract: Contract = await this.findOne(id);
    await this.repository.update(id, updateContractDto);

    return Object.assign({}, contract, updateContractDto);
  }

  async remove(id: number) {
    const contract: Contract = await this.findOne(id);
    return this.repository.remove(contract);
  }
}
