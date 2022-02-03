import { EntityTimestamp } from '../shared/entity/timestamp';
import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'phone_numbers' })
export class PhoneNumber extends EntityTimestamp {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 50 })
  public phone_number: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  public user: User;
}
