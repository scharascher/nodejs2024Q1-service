import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'old password',
    example: 'qwerty12345',
  })
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;
  @ApiProperty({
    description: 'new password',
    example: 'Th3Str0ng3stP4ssw0rdEver!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly newPassword: string;
}
