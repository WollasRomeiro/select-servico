import { ApiProperty } from '@nestjs/swagger';

export class WorkerFilter {
  @ApiProperty({ name: 'name', type: String, required: false, example: '1' })
  name?: string;
}
