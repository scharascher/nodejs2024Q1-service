import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUID_VERSION } from 'src/shared/const/uuid';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackSuccessResponse } from 'src/routes/track/track.decorator';
import { ApiErrorResponse } from 'src/shared/decorator/error.decorator';
import { SWAGGER_API_PARAM_ID } from 'src/shared/const/swagger';
import { FavoritesResponseDto } from 'src/routes/favorites/dto/favorites-response.dto';

@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get favorites' })
  @ApiResponse({ status: HttpStatus.OK, type: FavoritesResponseDto })
  @Get()
  async getFavorites(): Promise<FavoritesResponseDto> {
    return this.favoritesService.getFavorites();
  }

  @ApiOperation({ summary: 'Add album to favorites' })
  @TrackSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, "Doesn't exist")
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.addAlbum(id);
  }

  @ApiOperation({ summary: 'Add artist to favorites' })
  @TrackSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, "Doesn't exist")
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.addArtist(id);
  }

  @ApiOperation({ summary: 'Add track to favorites' })
  @TrackSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, "Doesn't exist")
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Post('track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.addTrack(id);
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @TrackSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Is not in favorites')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.deleteAlbum(id);
  }
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @TrackSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Is not in favorites')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.deleteArtist(id);
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @TrackSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Is not in favorites')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.favoritesService.deleteTrack(id);
  }
}
