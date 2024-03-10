import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { UUID_VERSION } from '../../../shared/const/uuid';
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_API_PROPERTY_ID } from 'src/shared/const/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Name',
    example: 'Around The World',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty({
    description: 'Track duration in seconds',
    example: 241,
  })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly duration: number;
  @ApiProperty(SWAGGER_API_PROPERTY_ID)
  @IsUUID(UUID_VERSION)
  @ValidateIf((_, value) => value !== null)
  readonly artistId: string | null;
  @ApiProperty(SWAGGER_API_PROPERTY_ID)
  @IsUUID(UUID_VERSION)
  @ValidateIf((_, value) => value !== null)
  readonly albumId: string | null;
}
