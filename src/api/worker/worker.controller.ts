import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationOptionsQuery } from 'util/entities/pagination-options.filter';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Worker } from './entities/worker.entity';
import { WorkerFilter } from './dto/worker-filter.dto';
import { SelectWorkerDto } from './dto/select-worker.dto';
import { paginationDTOResponse } from 'util/functions/pagination-swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'api/auth/strategies/jwt-auth.guard';

@ApiTags('worker')
@Controller('worker')
@UseGuards(JwtAuthGuard)
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find all Workes',
    type: paginationDTOResponse(SelectWorkerDto),
  })
  findAll(@Query() workerFilter: WorkerFilter, @Query() paginationOptions: PaginationOptionsQuery) {
    const options: IPaginationOptions = {
      limit: paginationOptions.limit ?? 10,
      page: paginationOptions.page ?? 1,
    };
    return this.workerService.findAll(workerFilter, options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerService.findOneDto(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workerService.update(+id, updateWorkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workerService.remove(+id);
  }
}
