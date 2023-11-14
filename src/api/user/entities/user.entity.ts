import { Default } from 'util/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Login } from 'api/login/entities/login.entity';

@Entity('usuario')
export class User extends Default {
  @Column({ name: 'nome', nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'idade', nullable: false, type: 'varchar' })
  age: string;

  @Column({ name: 'email', nullable: false, type: 'varchar' })
  email: string;

  @Column({ name: 'senha', nullable: false, type: 'varchar' })
  password: string;

  @Column({ name: 'cpf', nullable: false, type: 'varchar' })
  cpf: string;

  @Column({ name: 'telefone', nullable: false, type: 'varchar' })
  phone: string;

  @ManyToOne(() => Login)
  @JoinColumn({ name: 'login_id' })
  login: Login;

  @Column({ name: 'login_id' })
  loginId: number;
}
