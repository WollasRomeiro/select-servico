import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SelectContractDto } from './dto/select-contract.dto';
import { paginationDTOResponse } from 'util/functions/pagination-swagger';
import { PaginationOptionsQuery } from 'util/entities/pagination-options.filter';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ContractFilter } from './dto/contract-filter.dto';

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find all Contracts',
    type: paginationDTOResponse(SelectContractDto),
  })
  findAll(@Query() contractFilter: ContractFilter, @Query() paginationOptions: PaginationOptionsQuery) {
    const options: IPaginationOptions = {
      limit: paginationOptions.limit ?? 10,
      page: paginationOptions.page ?? 1,
    };
    return this.contractService.findAll(contractFilter, options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
