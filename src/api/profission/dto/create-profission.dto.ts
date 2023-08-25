import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'util/deafault.dto';

export class CreateProfissionDto extends DefaultDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  companyId: number;
}
