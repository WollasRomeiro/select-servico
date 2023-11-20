import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SelectUserDto } from './dto/select-user.dto';
import { paginationDTOResponse } from 'util/functions/pagination-swagger';
import { PaginationOptionsQuery } from 'util/entities/pagination-options.filter';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'api/auth/strategies/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find all Users',
    type: paginationDTOResponse(SelectUserDto),
  })
  findAll(@Query() paginationOptions: PaginationOptionsQuery) {
    const options: IPaginationOptions = {
      limit: paginationOptions.limit ?? 10,
      page: paginationOptions.page ?? 1,
    };
    return this.userService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
