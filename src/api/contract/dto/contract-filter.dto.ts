import { ApiProperty } from '@nestjs/swagger';

export class ContractFilter {
  @ApiProperty({ name: 'workerId', type: Number, required: false, example: '1' })
  workerId?: number;

  @ApiProperty({ name: 'companyId', type: Number, required: false, example: '1' })
  companyId?: number;

  @ApiProperty({ name: 'userId', type: Number, required: false, example: '1' })
  userId?: number;
}