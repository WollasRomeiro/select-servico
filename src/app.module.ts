import { Module } from '@nestjs/common';

import { WorkerModule } from './api/worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { ContractModule } from './api/contract/contract.module';

@Module({
  imports: [
    WorkerModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'bmuy2hi04zo7sou35m19-postgresql.services.clever-cloud.com',
      port: 5432,
      username: 'ue7di4cvgbgdb7bhigfh',
      password: '8iOt5FBLjk2dZrGq9jcJ0hhP662fWs',
      database: 'bmuy2hi04zo7sou35m19',
      synchronize: true,
      //timezone: '00:00',
      entities: ['dist/**/entities/*{.ts,.js}'],
    }),
    ContractModule,
  ],
})
export class AppModule {}
