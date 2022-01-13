import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  public preferred_username: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
