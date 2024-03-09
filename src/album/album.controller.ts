import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UUID_VERSION } from '../shared/const/uuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  async albums() {
    return this.albumService.getAllAlbums();
  }
  @Get(':id')
  async albumById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.albumService.getAlbumById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() updateAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.albumService.deleteAlbum(id);
  }
}
