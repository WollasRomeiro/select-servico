import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { SelectAddressDto } from './dto/select-address.dto';

@Injectable()
export class AddressService {
  constructor(@InjectRepository(Address) public readonly repository: Repository<Address>) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      const data = await this.repository.save(createAddressDto);
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

  async findAll(paginationOptions: IPaginationOptions): Promise<Pagination<SelectAddressDto>> {
    const query = this.repository.createQueryBuilder('company').select().orderBy('company.id', 'DESC');

    const results = await paginate<Address>(query, paginationOptions);
    const items = results.items.map((result) => new SelectAddressDto(result));

    return new Pagination<SelectAddressDto>(items, results.meta);
  }

  async findOne(id: number) {
    const address: Address = await this.repository.findOneBy({ id });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address: Address = await this.findOne(id);
    await this.repository.update(id, updateAddressDto);

    return Object.assign({}, address, updateAddressDto);
  }

  async remove(id: number) {
    const address: Address = await this.findOne(id);
    return this.repository.remove(address);
  }
}
