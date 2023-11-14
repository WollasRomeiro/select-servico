import { ApiProperty } from '@nestjs/swagger';
import { DefaultDTO } from 'util/deafault.dto';

export class CreateLoginDto extends DefaultDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: number;
}
