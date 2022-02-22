import { Contact } from './../contact/contact.entity';
import { PhoneNumber } from './../phone-numbers/phone-number.entity';
import { UserStatus } from './type/user-status.enum';
import { CaseOfUsing } from './type/user-case-of-using.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column()
  public preferredUsername: string;

  @Column()
  public name: string;

  @Column({ nullable: true, length: 50 })
  public phone: string;

  @Column({ nullable: true, length: 50 })
  public caseOfUsing: CaseOfUsing;

  @Column({ length: 50 })
  public status: UserStatus;

  @OneToOne(() => PhoneNumber)
  @JoinColumn()
  public bandwidthNumber: PhoneNumber;

  @OneToOne(() => Contact)
  @JoinColumn()
  public meContact: Contact;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
