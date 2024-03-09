import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from '../../shared/const/uuid';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly duration: number;
  @IsUUID(UUID_VERSION)
  @ValidateIf((_, value) => value !== null)
  readonly artistId: string | null;
  @IsUUID(UUID_VERSION)
  @ValidateIf((_, value) => value !== null)
  readonly albumId: string | null;
}
