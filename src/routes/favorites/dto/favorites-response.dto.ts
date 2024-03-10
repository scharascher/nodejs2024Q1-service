import { FavoritesResponse } from 'src/routes/favorites/favorites.interface';
import { ArtistDto } from 'src/routes/artist/dto/artist.dto';
import { AlbumDto } from 'src/routes/album/dto/album.dto';
import { TrackDto } from 'src/routes/track/dto/track.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FavoritesResponseDto implements FavoritesResponse {
  @ApiProperty({ type: ArtistDto, isArray: true })
  artists: ArtistDto[];
  @ApiProperty({ type: AlbumDto, isArray: true })
  albums: AlbumDto[];
  @ApiProperty({ type: TrackDto, isArray: true })
  tracks: TrackDto[];
}
