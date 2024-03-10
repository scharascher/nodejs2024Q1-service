import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_API_PROPERTY_ID } from 'src/shared/const/swagger';
import { CreateArtistDto } from 'src/routes/artist/dto/create-artist.dto';
import { IArtist } from 'src/routes/artist/artist.interface';

export class ArtistDto extends CreateArtistDto implements IArtist {
  @ApiProperty(SWAGGER_API_PROPERTY_ID)
  readonly id: string;
  @ApiProperty({ description: 'Has grammy', example: true, default: false })
  readonly grammy: boolean;
}
