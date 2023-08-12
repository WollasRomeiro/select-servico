import { Contract } from '../entities/contract.entity';
import { CreateContractDto } from './create-contract.dto';

export class SelectContractDto extends CreateContractDto {
  constructor(contract: Contract) {
    super();
    this.id = contract.id;
    this.data = contract.data;
    this.comment = contract.comment;
    this.hour = contract.hour;
  }
}
