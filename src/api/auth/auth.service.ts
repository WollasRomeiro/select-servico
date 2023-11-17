import { Injectable } from '@nestjs/common';
import { User } from 'api/user/entities/user.entity';
import { UserService } from 'api/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };
    let token;

    try {
      token = this.jwtService.sign(payload);
    } catch (error) {
      return error.message;
    }

    return { token: token };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneOrFail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
