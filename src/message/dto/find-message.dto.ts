import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindMessageDto {
  @IsUUID()
  @IsNotEmpty()
  public sender_id: string;

  @IsUUID()
  @IsNotEmpty()
  public receiver_id: string;
}
