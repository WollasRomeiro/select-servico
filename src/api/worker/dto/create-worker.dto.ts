import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'src/util/deafault.dto';

export class CreateWorkerDto extends DefaultDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  midpoint: string;
}
