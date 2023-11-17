import { Injectable, MaxFileSizeValidator, PayloadTooLargeException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "W3hH9MWFLwJFB7YayaSa+MJFxaqjGnxdMlFhTwzwmX8=",
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
