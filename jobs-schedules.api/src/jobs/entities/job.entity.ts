import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { JobStatus } from '../enums/jobs-status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { BaseEntity } from '../../common/baseEntity/baseEntity';

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.PENDING,
  })
  status: JobStatus;

  @Column({ type: 'timestamp', nullable: true })
  lastRun: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextRun: Date;

  @Column()
  interval: string;

  @Column({ type: 'jsonb', nullable: true })
  parameters: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  user: UserEntity;
}
