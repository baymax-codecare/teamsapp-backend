import { EntityTimestamp } from '../shared/entity/timestamp';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'phoneNumbers' })
export class PhoneNumber extends EntityTimestamp {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 50 })
  public phoneNumber: string;
}
