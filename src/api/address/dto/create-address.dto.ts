import { ApiProperty } from "@nestjs/swagger";
import { DefaultDTO } from "util/deafault.dto";

export class CreateAddressDto extends DefaultDTO {
  @ApiProperty()
  road: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  country: string;
}
