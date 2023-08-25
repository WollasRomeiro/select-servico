import { Profission } from "../entities/profission.entity";
import { CreateProfissionDto } from "./create-profission.dto";

export class SelectProfissionDto extends CreateProfissionDto {
    constructor(profission: Profission) {
      super();
      this.id = profission.id;
      this.name = profission.name;
      this.companyId = profission.companyId;
    }
  }