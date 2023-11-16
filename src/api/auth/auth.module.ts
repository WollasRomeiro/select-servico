import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "api/user/user.module";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies/local.trategies";
import { AuthService } from "./auth.service";
import { UserService } from "api/user/user.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            privateKey: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn : '68s' },
        }),
    ],
    controllers: [AuthController],
    providers : [AuthService, LocalStrategy],
})

export class AuthModule {}  