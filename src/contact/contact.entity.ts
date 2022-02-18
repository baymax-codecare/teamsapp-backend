import { User } from './../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'email', nullable: true })
  public email: string;

  @Column({ name: 'phone_number' })
  public phoneNumber: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
