import { ApiProperty } from '@nestjs/swagger';

export class PaginationOptionsQuery {
  @ApiProperty({
    name: 'limit',
    type: Number,
    required: false,
    example: 10,
    default: 10,
  })
  limit: number;

  @ApiProperty({
    name: 'page',
    type: Number,
    required: false,
    example: 3,
    default: 1,
  })
  page: number;
}