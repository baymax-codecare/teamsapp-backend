import { Contact } from './../contact/contact.entity';
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

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'sender_id' })
  public sender: Contact;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'receiver_id' })
  public receiver: Contact;

  @Column({ name: 'is_read', default: false })
  public isRead: boolean;

  @Column({ name: 'is_sent', default: false })
  public isSent: boolean;

  @Column({ name: 'is_sender_deleted', default: false })
  public isSenderDeleted: boolean;

  @Column({ name: 'is_receiver_deleted', default: false })
  public isReceiverDeleted: boolean;
}
