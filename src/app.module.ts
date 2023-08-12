import { Module } from '@nestjs/common';

import { WorkerModule } from './api/worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { ContractModule } from './api/contract/contract.module';
import { CompanyModule } from './api/company/company.module';
import yaml from './config';

@Module({
  imports: [WorkerModule, UserModule, TypeOrmModule.forRoot(yaml().orm), ContractModule, CompanyModule],
})
export class AppModule {}
