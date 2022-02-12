import { PhoneNumber } from './../phone-numbers/phone-number.entity';
import { User } from './../user/user.entity';
import { EntityTimestamp } from '../shared/entity/timestamp';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages ' })
export class Message extends EntityTimestamp {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 255 })
  public sms: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  public sender: User;

  @ManyToOne(() => PhoneNumber)
  @JoinColumn({ name: 'sender_phone_id' })
  public senderPhone: PhoneNumber;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiver_id' })
  public receiver: User;

  @ManyToOne(() => PhoneNumber)
  @JoinColumn({ name: 'receiver_phone_id' })
  public receiverPhone: PhoneNumber;

  @Column({ name: 'is_read', default: false })
  public isRead: boolean;

  @Column({ name: 'is_sent', default: false })
  public isSent: boolean;

  @Column({ name: 'is_sender_deleted', default: false })
  public isSenderDeleted: boolean;

  @Column({ name: 'is_receiver_deleted', default: false })
  public isReceiverDeleted: boolean;
}
