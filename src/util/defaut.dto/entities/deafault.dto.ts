import { ApiResponseProperty } from '@nestjs/swagger';

export class DefaultDTO {
  @ApiResponseProperty({ example: 1 })
  id?: number;

  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date;
}
