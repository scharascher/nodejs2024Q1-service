import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Login',
    example: 'myLogin',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly login: string;
  @ApiProperty({
    description: 'Password',
    example: 'Th3Str0ng3stP4ssw0rdEver!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly password: string;
}
