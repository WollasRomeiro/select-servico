import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'util/deafault.dto';

export class CreateUserDto extends DefaultDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  loginId: number;
}
