import { Module } from '@nestjs/common';

import { WorkerModule } from './api/worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { ContractModule } from './api/contract/contract.module';
import { CompanyModule } from './api/company/company.module';
import { AddressModule } from './api/address/address.module';
import { ProfissionModule } from './api/profission/profission.module';
import yaml from './config';
import { HomeController } from 'util/controller/home.controller';
import { LoginModule } from './api/login/login.module';

@Module({
  imports: [WorkerModule, UserModule, TypeOrmModule.forRoot(yaml().orm), ContractModule, CompanyModule, AddressModule, ProfissionModule, LoginModule],
  controllers: [HomeController],
})
export class AppModule {}
