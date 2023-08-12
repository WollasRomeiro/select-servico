import { Column, Entity } from 'typeorm';
import { Default } from 'util/default.entity';

@Entity('empresa')
export class Company extends Default {
  @Column({ name: 'nome', nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'email', nullable: false, type: 'varchar' })
  email: string;

  @Column({ name: 'senha', nullable: false, type: 'varchar' })
  password: string;

  @Column({ name: 'cpf', nullable: false, type: 'varchar' })
  cpf: string;

  @Column({ name: 'telefone', nullable: false, type: 'varchar' })
  phone: string;
}
