import { Column, Entity } from 'typeorm';

@Entity('trabalhador')
export class Worker {
  @Column({ name: 'nome', nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'cnpj', nullable: false, type: 'varchar' })
  cnpj: string;

  @Column({ name: 'mediaponto', nullable: false, type: 'varchar' })
  midpoint: string;
}
