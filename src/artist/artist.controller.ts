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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}
  @Get()
  async artists() {
    return this.artistService.getAllArtists();
  }
  @Get(':id')
  async artistById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.artistService.getArtistById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.artistService.deleteArtist(id);
  }
}
