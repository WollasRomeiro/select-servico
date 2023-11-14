import { Login } from '../entities/login.entity';
import { CreateLoginDto } from './create-login.dto';

export class SelectLoginDto extends CreateLoginDto {
  constructor(login: Login) {
    super();
    this.id = login.id;
    this.email = login.email;
    this.password = login.password;
  }
}