import { User } from 'api/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Default } from 'util/default.entity';

@Entity('login')
export class Login extends Default {
  @Column({ name: 'email', nullable: false, type: 'varchar' })
  email: string;

  @Column({ name: 'senha', nullable: false, type: 'varchar' })
  password: number;
}
