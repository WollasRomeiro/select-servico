import { Module } from '@nestjs/common';
import { ProfissionService } from './profission.service';
import { ProfissionController } from './profission.controller';
import { Profission } from './entities/profission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Profission])],
  controllers: [ProfissionController],
  providers: [ProfissionService]
})
export class ProfissionModule {}
