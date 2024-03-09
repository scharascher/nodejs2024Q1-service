import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from '../../shared/const/uuid';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsBoolean()
  @IsNotEmpty()
  readonly grammy?: boolean;
}
