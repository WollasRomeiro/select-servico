import { ApiProperty } from '@nestjs/swagger';

class Meta {
  @ApiProperty({ example: 1 })
  itemCount: number;

  @ApiProperty({ example: 10 })
  totalItems?: number;

  @ApiProperty({ example: 10 })
  itemsPerPage: number;

  @ApiProperty({ example: 1 })
  totalPages?: number;

  @ApiProperty({ example: 1 })
  currentPage: number;
}

export function paginationDTOResponse<T>(type: new (...args: any) => T) {
  class PaginationDTOResponse {
    @ApiProperty({ type: type, isArray: true })
    items: T[];

    @ApiProperty({ type: Meta })
    meta: Meta;
  }

  return PaginationDTOResponse;
}
