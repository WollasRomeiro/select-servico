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
import { AuthController } from './api/auth/auth.controller';
import { AuthService } from './api/auth/auth.service';
import { AuthModule } from 'api/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'api/auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(yaml().orm),
    WorkerModule,
    UserModule,
    ContractModule,
    CompanyModule,
    AddressModule,
    ProfissionModule,
    AuthModule,
    JwtModule.register({
      privateKey: 'W3hH9MWFLwJFB7YayaSa+MJFxaqjGnxdMlFhTwzwmX8=',
      signOptions: { expiresIn: '9999s' },
    }),
  ],
  controllers: [HomeController, AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
