import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ type: 'boolean', default: false })
  deleted: boolean;
  @Column({ type: 'timestamp', default: null })
  deletedAt: Date;
  @Column({ nullable: true })
  deletedBy: number;
}
