import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { paginationDTOResponse } from 'util/functions/pagination-swagger';
import { PaginationOptionsQuery } from 'util/entities/pagination-options.filter';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { SelectAddressDto } from './dto/select-address.dto';
import { JwtAuthGuard } from 'api/auth/strategies/jwt-auth.guard';

@ApiTags('address')
@Controller('address')
@UseGuards(JwtAuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find all Address',
    type: paginationDTOResponse(SelectAddressDto),
  })
  findAll(@Query() paginationOptions: PaginationOptionsQuery) {
    const options: IPaginationOptions = {
      limit: paginationOptions.limit ?? 10,
      page: paginationOptions.page ?? 1,
    };
    return this.addressService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
