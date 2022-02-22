import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsString()
  @IsOptional()
  public email?: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  public phoneNumber: string;

  @IsBoolean()
  @IsOptional()
  public isHidden?: boolean;

  @IsBoolean()
  @IsOptional()
  public isRoot?: boolean;
}
