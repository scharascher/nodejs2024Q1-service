import { User } from '@prisma/client';
import { IUser } from '../user.interface';
import {
  IS_INT,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from '../../../shared/const/uuid';
import { Expose, Transform, Type } from 'class-transformer';

export class UserDto implements Omit<IUser, 'password'> {
  @IsNotEmpty()
  @IsUUID(UUID_VERSION)
  @Expose()
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly login: string;
  @IsNotEmpty()
  @IsDate()
  @Expose()
  @Transform(({ value }) => +new Date(value))
  readonly createdAt: number;
  @IsNotEmpty()
  @IsDate()
  @Expose()
  @Transform(({ value }) => +new Date(value))
  readonly updatedAt: number;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Expose()
  readonly version: number;
}
