import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class PatchMessageDto {
  @IsUUID()
  public id: string;

  @IsBoolean()
  @IsOptional()
  public is_read?: boolean;

  @IsBoolean()
  @IsOptional()
  public is_sent?: boolean;

  @IsBoolean()
  @IsOptional()
  public is_sender_deleted?: boolean;

  @IsBoolean()
  @IsOptional()
  public is_receiver_deleted?: boolean;
}
