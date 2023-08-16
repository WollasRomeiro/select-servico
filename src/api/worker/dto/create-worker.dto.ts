import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'util/deafault.dto';

export class CreateWorkerDto extends DefaultDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  education: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  function: string;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  userId: number;
}
