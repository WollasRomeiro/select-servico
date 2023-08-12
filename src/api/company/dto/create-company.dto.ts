import { ApiProperty } from '@nestjs/swagger';
import { Default } from 'util/default.entity';

export class CreateCompanyDto extends Default {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;
}
