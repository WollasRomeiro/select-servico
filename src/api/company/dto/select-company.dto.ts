import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from './create-company.dto';

export class SelectCompanyDto extends CreateCompanyDto {
  constructor(company: Company) {
    super();
    this.id = company.id;
    this.name = company.name;
    this.email = company.email;
    this.password = company.password;
    this.cpf = company.cpf;
    this.phone = company.phone;
  }
}
