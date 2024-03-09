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
import { UUID_VERSION } from '../../shared/const/uuid';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  async tracks() {
    return this.trackService.getAllTracks();
  }
  @Get(':id')
  async trackById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.trackService.getTrackById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.trackService.deleteTrack(id);
  }
}
