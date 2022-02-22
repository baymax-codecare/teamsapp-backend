import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  public preferredUsername: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
