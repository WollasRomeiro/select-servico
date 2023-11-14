import { User } from "../entities/user.entity";
import { CreateUserDto } from "./create-user.dto";

export class SelectUserDto extends CreateUserDto {
    constructor(user: User) {
      super();
      this.id = user.id;
      this.name = user.name;
      this.age = user.age;
      this.email = user.email;
      this.password = user.password;
      this.cpf = user.cpf;
      this.phone = user.phone;
      this.loginId = user.loginId;
    }
  }