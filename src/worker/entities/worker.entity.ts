import { Column, Entity } from 'typeorm';
import { Default } from 'util/default.entity';

@Entity('trabalhador')
export class Worker extends Default {
  @Column({ name: 'nome', nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'cnpj', nullable: false, type: 'varchar' })
  cnpj: string;

  @Column({ name: 'mediaponto', nullable: false, type: 'varchar' })
  midpoint: string;
}
