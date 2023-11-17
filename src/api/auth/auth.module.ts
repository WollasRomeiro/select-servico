import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'api/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategies';
import { AuthService } from './auth.service';
import { UserService } from 'api/user/user.service';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
