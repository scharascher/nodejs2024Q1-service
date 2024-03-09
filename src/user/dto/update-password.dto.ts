import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly newPassword: string;
}
