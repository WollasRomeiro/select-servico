import { Column, Entity } from 'typeorm';
import { Default } from 'src/util/default.entity';

@Entity('trabalhador')
export class Worker extends Default {
  @Column({ name: 'nome', nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'email', nullable: true, type: 'varchar' })
  email: string;

  @Column({ name: 'escolaridade', nullable: true, type: 'varchar' })
  schooling: string;

  @Column({ name: 'cnpj', nullable: true, type: 'varchar' })
  cnpj: string;

  @Column({ name: 'telefone', nullable: true, type: 'varchar' })
  phone: string;

  @Column({ name: 'funcao', nullable: true, type: 'varchar' })
  function: string;
}
