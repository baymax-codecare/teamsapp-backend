import { UserStatus } from './../type/user-status.enum';
import { CaseOfUsing } from './../type/user-case-of-using.enum';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
export class PatchMeDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  public phone?: string;

  @IsEnum(CaseOfUsing)
  @IsOptional()
  public case_of_using?: CaseOfUsing;

  @IsEnum(UserStatus)
  @IsOptional()
  public status?: UserStatus;
}
