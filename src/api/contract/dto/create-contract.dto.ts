import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';
import { DefaultDTO } from 'util/deafault.dto';

export class CreateContractDto extends DefaultDTO {
  @ApiProperty()
  data: Date;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  hour: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  workerId: number;

  @ApiProperty()
  companyId?: number;
}
