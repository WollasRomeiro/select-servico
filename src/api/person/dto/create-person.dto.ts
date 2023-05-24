import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'src/util/deafault.dto';

export class CreatePersonDto extends DefaultDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  cpf: string;
}
