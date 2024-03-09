import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUID_VERSION } from '../shared/const/uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}
  @Get()
  async getFavorites() {
    return this.favoritesService.getFavorites();
  }
  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.addAlbum(id);
  }
  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.addArtist(id);
  }
  @Post('track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.deleteAlbum(id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.deleteArtist(id);
  }
  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.deleteTrack(id);
  }
}
