import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { SelectLoginDto } from './dto/select-login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    public readonly repository: Repository<Login>,
  ) {}
 async create(createLoginDto: CreateLoginDto) {
    try {
      const data = await this.repository.save(createLoginDto);
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

  async findAll(paginationOptions: IPaginationOptions): Promise<Pagination<SelectLoginDto>> {
    const query = this.repository.createQueryBuilder('login').select().orderBy('login.id', 'DESC');

    const results = await paginate<Login>(query, paginationOptions);
    const items = results.items.map((result) => new SelectLoginDto(result));

    return new Pagination<SelectLoginDto>(items, results.meta);
  }

  async findOne(id: number) {
    const login: Login = await this.repository.findOneBy({ id });

    if (!login) {
      throw new NotFoundException('Login not found');
    }

    return login;
  }

  async update(id: number, updateLoginDto: UpdateLoginDto) {
    const login: Login = await this.findOne(id);
    await this.repository.update(id, updateLoginDto);

    return Object.assign({}, login, updateLoginDto);
  }

  async remove(id: number) {
    const login: Login = await this.findOne(id);
    return this.repository.remove(login);
  }
}
