import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from '../../shared/const/uuid';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsInt()
  @IsNotEmpty()
  readonly year: number;
  @IsUUID(UUID_VERSION)
  @ValidateIf((_, value) => value !== null)
  readonly artistId: string | null;
}
