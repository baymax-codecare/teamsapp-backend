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

  @Column({ unique: true })
  public phoneNumber: string;

  @Column({ default: 'false' })
  public isHidden?: boolean;

  @Column({ default: false })
  public isRoot?: boolean; // True: a contact that uses bandwidth number as a service of our teams app

  // @OneToMany(() => PhoneNumber, (phoneNumber) => phoneNumber.user)
  // public bandwidthNumbers: PhoneNumber[];

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'userId' })
  public user: User;
}
