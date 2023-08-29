import { ApiProperty } from '@nestjs/swagger';

export class WorkerFilter {
  @ApiProperty({ name: 'name', type: Number, required: false, example: '1' })
  name?: number;
}