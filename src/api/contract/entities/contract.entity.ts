import { User } from 'api/user/entities/user.entity';
import { Default } from 'util/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, Timestamp } from 'typeorm';

@Entity('contrato')
export class Contract extends Default {
  @Column({ name: 'data', nullable: false, type: 'timestamp' })
  data: Date;

  @Column({ name: 'comentario', nullable: false, type: 'varchar' })
  comment: string;

  @Column({ name: 'hora', nullable: true, type: 'timestamp' })
  hour: Timestamp;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  user: User;
}
