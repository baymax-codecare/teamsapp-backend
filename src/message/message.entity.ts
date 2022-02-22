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
  @JoinColumn()
  public sender: Contact;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'receiverId' })
  public receiver: Contact;

  @Column({ default: false })
  public isRead: boolean;

  @Column({ default: false })
  public isSent: boolean;

  @Column({ default: false })
  public isSenderDeleted: boolean;

  @Column({ default: false })
  public isReceiverDeleted: boolean;
}
