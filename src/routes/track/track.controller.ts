import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UUID_VERSION } from 'src/shared/const/uuid';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TrackSuccessResponse } from './track.decorator';
import { ApiErrorResponse } from 'src/shared/decorator/error.decorator';
import { SWAGGER_API_PARAM_ID } from 'src/shared/const/swagger';
import { UpdateTrackDto } from 'src/routes/track/dto/update-track.dto';
import { TRACK_NOT_FOUND_ERROR } from 'src/routes/track/const';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @TrackSuccessResponse(HttpStatus.OK, { isArray: true })
  @Get()
  async tracks() {
    return this.trackService.getAllTracks();
  }

  @ApiOperation({ summary: 'Get track by id' })
  @TrackSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Not found')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Get(':id')
  async trackById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.trackService.getTrackById(id);
  }

  @ApiOperation({ summary: 'Create track' })
  @TrackSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'duration must be an integer number',
    'duration must be a positive number',
  ])
  @ApiBody({ type: CreateTrackDto })
  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @ApiOperation({ summary: 'Update track' })
  @TrackSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'duration must be an integer number',
    'duration must be a positive number',
  ])
  @ApiBody({ type: UpdateTrackDto })
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, TRACK_NOT_FOUND_ERROR)
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.trackService.deleteTrack(id);
  }
}
