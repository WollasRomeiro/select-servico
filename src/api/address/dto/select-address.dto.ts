import { Address } from '../entities/address.entity';
import { CreateAddressDto } from './create-address.dto';

export class SelectAddressDto extends CreateAddressDto {
  constructor(address: Address) {
    super();
    this.id = address.id;
    this.road = address.road;
    this.state = address.state;
    this.city = address.city;
    this.number = address.number;
    this.neighborhood = address.neighborhood;
    this.country = address.country;
    this.companyId = address.companyId;
  }
}
