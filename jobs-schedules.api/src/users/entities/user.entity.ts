import { BaseEntity } from '../../common/baseEntity/baseEntity';
import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { hash } from 'bcrypt';
@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  fullName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  countryCode: string;

  @Column('varchar')
  phone: string;

  @Column({ type: 'text' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
