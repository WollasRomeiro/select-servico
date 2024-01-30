import { ApiProperty } from '@nestjs/swagger';
import { Worker } from '../entities/worker.entity';
import { CreateWorkerDto } from './create-worker.dto';

export class SelectWorkerDto extends CreateWorkerDto {
  @ApiProperty()
  image: string;

  constructor(worker: Worker, image: string) {
    super();
    this.id = worker.id;
    this.name = worker.name;
    this.email = worker.email;
    this.education = worker.education;
    this.cnpj = worker.cnpj;
    this.phone = worker.phone;
    this.function = worker.function;
    this.companyId = worker.companyId;
    this.userId = worker.userId;
    this.image = image;
  }
}
