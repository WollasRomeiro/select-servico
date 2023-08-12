import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { SelectCompanyDto } from './dto/select-company.dto';


@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) public readonly repository: Repository<Company>) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const data = await this.repository.save(createCompanyDto);
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

  async findAll(paginationOptions: IPaginationOptions):Promise<Pagination<SelectCompanyDto>> {
    const query = this.repository.createQueryBuilder('company').select().orderBy('company.id', 'DESC');

    const results = await paginate<Company>(query, paginationOptions);
    const items = results.items.map((result) => new SelectCompanyDto(result));

    return new Pagination<SelectCompanyDto>(items, results.meta);
  }

  async findOne(id: number) {
    const company: Company = await this.repository.findOneBy({ id });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company: Company = await this.findOne(id);
    await this.repository.update(id, updateCompanyDto);

    return Object.assign({}, company, updateCompanyDto);
  }

  async remove(id: number) {
    const company: Company = await this.findOne(id);
    return this.repository.remove(company);
  }
}
