import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_API_PROPERTY_ID } from 'src/shared/const/swagger';
import { CreateAlbumDto } from 'src/routes/album/dto/create-album.dto';
import { IAlbum } from 'src/routes/album/album.interface';

export class AlbumDto extends CreateAlbumDto implements IAlbum {
  @ApiProperty(SWAGGER_API_PROPERTY_ID)
  readonly id: string;
}
