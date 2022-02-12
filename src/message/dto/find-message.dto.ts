import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindMessageDto {
  @IsUUID()
  @IsNotEmpty()
  public senderId: string;

  @IsUUID()
  @IsNotEmpty()
  public senderPhoneId: string;

  @IsUUID()
  @IsNotEmpty()
  public receiverId: string;

  @IsUUID()
  @IsNotEmpty()
  public receiverPhoneId: string;
}
