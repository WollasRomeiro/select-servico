import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Default } from 'util/default.entity';
import { User } from 'api/user/entities/user.entity';
import { Company } from 'api/company/entities/company.entity';

@Entity('trabalhador')
export class Worker extends Default {
  @Column({ name: 'nome', nullable: false, type: 'varchar' })
  name: string;

  @Column({ name: 'email', nullable: true, type: 'varchar' })
  email: string;

  @Column({ name: 'escolaridade', nullable: true, type: 'varchar' })
  education: string;

  @Column({ name: 'cnpj', nullable: true, type: 'varchar' })
  cnpj: string;

  @Column({ name: 'telefone', nullable: true, type: 'varchar' })
  phone: string;

  @Column({ name: 'funcao', nullable: true, type: 'varchar' })
  function: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'company_id' })
  companyId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
