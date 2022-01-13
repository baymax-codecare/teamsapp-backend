import { UserStatus } from './type/user-status.enum';
import { CaseOfUsing } from './type/user-case-of-using.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column()
  public preferred_username: string;

  @Column()
  public name: string;

  @Column({ nullable: true, length: 50 })
  public phone: string;

  @Column({ nullable: true, length: 50 })
  public case_of_using: CaseOfUsing;

  @Column({ length: 50 })
  public status: UserStatus;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
