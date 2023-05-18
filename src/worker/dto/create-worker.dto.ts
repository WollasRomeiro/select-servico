import { DefaultDTO } from 'src/util/defaut.dto/entities/deafault.dto';

export class CreateWorkerDto extends DefaultDTO {
  name: string;

  cnpj: string;

  midpoint: string;
}
