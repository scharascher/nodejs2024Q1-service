import { IUser } from '../user.interface';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from '../../../shared/const/uuid';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_API_PROPERTY_ID } from '../../../shared/const/swagger';

export class UserDto implements Omit<IUser, 'password'> {
  @ApiProperty(SWAGGER_API_PROPERTY_ID)
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  @Expose()
  readonly id: string;
  @ApiProperty({
    description: 'unique string',
    example: 'simplyTheBest',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly login: string;
  @ApiProperty({
    description: 'timestamp when user created',
    example: 1710007945420,
  })
  @IsNotEmpty()
  @IsDate()
  @Expose()
  @Transform(({ value }) => +new Date(value))
  readonly createdAt: number;
  @IsNotEmpty()
  @IsDate()
  @Expose()
  @Transform(({ value }) => +new Date(value))
  @ApiProperty({
    description: 'timestamp when user updated',
    example: 1710022345678,
  })
  readonly updatedAt: number;
  @ApiProperty({
    description: 'version of user, increments on each update',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Expose()
  readonly version: number;
}
