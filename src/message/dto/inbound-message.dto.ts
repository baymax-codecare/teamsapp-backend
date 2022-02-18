import { IsNotEmpty, IsString } from 'class-validator';

export class BandwidthMsg {
  @IsNotEmpty()
  @IsString()
  public from: string;

  @IsNotEmpty()
  @IsString()
  public to: string;

  @IsString()
  public text: string;
}
export class InboundMessageDto {
  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsNotEmpty()
  public message: BandwidthMsg;
}
