import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly login: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly password: string;
}
