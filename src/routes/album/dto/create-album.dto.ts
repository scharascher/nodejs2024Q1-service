import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from 'src/shared/const/uuid';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  readonly year: number;
  @ApiProperty()
  @IsUUID(UUID_VERSION)
  @ValidateIf((_, value) => value !== null)
  readonly artistId: string | null;
}
