import { Column, Entity } from 'typeorm';
import { Default } from 'util/default.entity';

@Entity('endereco')
export class Address extends Default {
  @Column({ name: 'rua', nullable: false, type: 'varchar', length: 200 })
  road: string;

  @Column({ name: 'estado', nullable: false, type: 'varchar' })
  state: string;

  @Column({ name: 'cidade', nullable: false, type: 'varchar' })
  city: string;

  @Column({ name: 'numero', nullable: false, type: 'varchar' })
  number: string;

  @Column({ name: 'bairro', nullable: false, type: 'varchar' })
  neighborhood: string;

  @Column({ name: 'país', nullable: false, type: 'varchar' })
  country: string;
}
