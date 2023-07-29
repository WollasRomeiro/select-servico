import { User } from 'src/api/user/entities/user.entity';
import { Default } from 'src/util/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, Timestamp } from 'typeorm';

@Entity('Contrato')
export class Contract extends Default {
  @Column({ name: 'data', nullable: false, type: 'timestamp' })
  data: Date;

  @Column({ name: 'comentario', nullable: false, type: 'varchar' })
  comment: string;

  @Column({ name: 'hora', nullable: false, type: 'timestamp' })
  hour: Timestamp;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  user: User;
}
