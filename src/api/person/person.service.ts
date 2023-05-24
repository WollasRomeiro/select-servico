import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) public readonly repository: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    try {
      const data = await this.repository.save(createPersonDto);
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

  async findAll(): Promise<Person[]> {
    return this.repository.find();
  }

  async findOne(id: number) {
    const person: Person = await this.repository.findOneBy({ id });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person: Person = await this.findOne(id);
    await this.repository.update(id, updatePersonDto);

    return Object.assign({}, person, updatePersonDto);
  }

  async remove(id: number) {
    const person: Person = await this.findOne(id);
    return this.repository.remove(person);
  }
}
