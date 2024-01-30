import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  image: string;
}
