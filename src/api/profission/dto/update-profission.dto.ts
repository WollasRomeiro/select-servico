import { PartialType } from '@nestjs/swagger';
import { CreateProfissionDto } from './create-profission.dto';

export class UpdateProfissionDto extends PartialType(CreateProfissionDto) {}
