import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProfissionService } from './profission.service';
import { CreateProfissionDto } from './dto/create-profission.dto';
import { UpdateProfissionDto } from './dto/update-profission.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { paginationDTOResponse } from 'util/functions/pagination-swagger';
import { PaginationOptionsQuery } from 'util/entities/pagination-options.filter';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { SelectProfissionDto } from './dto/select-profission.dto';
import { JwtAuthGuard } from 'api/auth/strategies/jwt-auth.guard';

@Controller('profission')
@ApiTags('profission')
@UseGuards(JwtAuthGuard)
export class ProfissionController {
  constructor(private readonly profissionService: ProfissionService) {}

  @Post()
  create(@Body() createProfissionDto: CreateProfissionDto) {
    return this.profissionService.create(createProfissionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find all Profissions',
    type: paginationDTOResponse(SelectProfissionDto),
  })
  findAll(@Query() paginationOptions: PaginationOptionsQuery) {
    const options: IPaginationOptions = {
      limit: paginationOptions.limit ?? 10,
      page: paginationOptions.page ?? 1,
    };
    return this.profissionService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfissionDto: UpdateProfissionDto) {
    return this.profissionService.update(+id, updateProfissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profissionService.remove(+id);
  }
}
