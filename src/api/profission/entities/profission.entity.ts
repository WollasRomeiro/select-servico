import { Company } from 'api/company/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Default } from 'util/default.entity';

@Entity('profissao')
export class Profission extends Default {
  @Column({ name: 'nome', nullable: false, type: 'varchar' })
  name: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'empresa_id' })
  company: Company;

  @Column({ name: 'empresa_id' })
  companyId: number;
}
