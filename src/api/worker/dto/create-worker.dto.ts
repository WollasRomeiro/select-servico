import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'src/util/deafault.dto';

export class CreateWorkerDto extends DefaultDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  schooling: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  function: string;
}
