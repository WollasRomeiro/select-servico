import { User } from 'api/user/entities/user.entity';
import { Default } from 'util/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, Timestamp } from 'typeorm';
import { Company } from 'api/company/entities/company.entity';
import { Worker } from 'api/worker/entities/worker.entity';

@Entity('contrato')
export class Contract extends Default {
  @Column({ name: 'data', nullable: false, type: 'timestamp' })
  data: Date;

  @Column({ name: 'comentario', nullable: false, type: 'varchar' })
  comment: string;

  @Column({ name: 'hora', nullable: true, type: 'timestamp' })
  hour: Timestamp;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Worker)
  @JoinColumn({ name: 'worker_id' })
  worker: Worker;

  @Column({ name: 'worker_id' })
  workerId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'company_id' })
  companyId: number;
}
