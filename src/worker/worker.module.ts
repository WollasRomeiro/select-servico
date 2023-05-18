import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { Worker } from './entities/worker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Worker])],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
