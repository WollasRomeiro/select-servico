import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectContractDto } from './dto/select-contract.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ContractFilter } from './dto/contract-filter.dto';

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

  async findAll(contractFilter: ContractFilter, paginationOptions: IPaginationOptions): Promise<Pagination<SelectContractDto>> {
    const { workerId, companyId, userId } = contractFilter;
    const query = this.repository.createQueryBuilder('contract').select().orderBy('contract.id', 'DESC');

    if (workerId) {
      query.andWhere('contract.workerId = :workerId', { workerId });
    }

    if (companyId) {
      query.andWhere('contract.companyId = :companyId', { companyId });
    }

    if (userId) {
      query.andWhere('contract.userId = :userId', { userId });
    }

    const results = await paginate<Contract>(query, paginationOptions);
    const items = results.items.map((result) => new SelectContractDto(result));

    return new Pagination<SelectContractDto>(items, results.meta);
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
