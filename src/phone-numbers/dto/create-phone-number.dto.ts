import { MaxLength, IsString } from 'class-validator';

export class CreatePhoneNumberDTO {
  @IsString()
  @MaxLength(15)
  public number: string;
}
