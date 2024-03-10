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
import { UUID_VERSION } from '../../shared/const/uuid';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorResponse } from 'src/shared/decorator/error.decorator';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { ARTIST_NOT_FOUND_ERROR } from 'src/routes/artist/const';
import { ArtistSuccessResponse } from 'src/routes/artist/artist.decorator';
import { SWAGGER_API_PARAM_ID } from 'src/shared/const/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ArtistSuccessResponse(HttpStatus.OK, { isArray: true })
  @Get()
  async artists() {
    return this.artistService.getAllArtists();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ArtistSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Not found')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Get(':id')
  async artistById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.artistService.getArtistById(id);
  }

  @ApiOperation({ summary: 'Create artist' })
  @ArtistSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'name must be a string',
    'name should not be empty',
  ])
  @ApiBody({ type: CreateArtistDto })
  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @ApiOperation({ summary: 'Update artist' })
  @ArtistSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'name must be a string',
    'name should not be empty',
  ])
  @ApiBody({ type: UpdateArtistDto })
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @ApiOperation({ summary: 'Delete artist' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, ARTIST_NOT_FOUND_ERROR)
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.artistService.deleteArtist(id);
  }
}
