import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) public readonly repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.repository.save(createUserDto);
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

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(id: number) {
    const user: User = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Person not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = await this.findOne(id);
    await this.repository.update(id, updateUserDto);

    return Object.assign({}, user, updateUserDto);
  }

  async remove(id: number) {
    const user: User = await this.findOne(id);
    return this.repository.remove(user);
  }
}
