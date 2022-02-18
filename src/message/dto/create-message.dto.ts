import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(160)
  public sms: string;

  @IsUUID()
  @IsNotEmpty()
  public sender_id: string;

  @IsUUID()
  @IsNotEmpty()
  public receiver_id: string;
}
