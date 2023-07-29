import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'src/util/deafault.dto';
import { Timestamp } from 'typeorm';

export class CreateContractDto extends DefaultDTO {
  @ApiProperty()
  data: Date;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  hour: Timestamp;
}
