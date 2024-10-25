import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SelectUserDto } from './dto/select-user.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) public readonly repository: Repository<User>) {}

  private hashPassword(password: string): string {
    return hashSync(password, 10);
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = this.hashPassword(createUserDto.password);
      const data = await this.repository.save({ ...createUserDto, password: hashedPassword });
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

  async findAll(paginationOptions: IPaginationOptions): Promise<Pagination<SelectUserDto>> {
    const query = this.repository.createQueryBuilder('user').select().orderBy('user.id', 'DESC');

    const results = await paginate<User>(query, paginationOptions);
    const items = results.items.map((result) => new SelectUserDto(result));

    return new Pagination<SelectUserDto>(items, results.meta);
  }

  async findOne(id: number) {
    const user: User = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneOrFail(
    email: string,
    /*options?: FindOneOptions<User>,*/
  ) {
    try {
      return await this.repository.findOneOrFail({ where: { email } });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
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
