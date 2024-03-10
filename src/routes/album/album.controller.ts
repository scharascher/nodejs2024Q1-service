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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlbumSuccessResponse } from 'src/routes/album/album.decorator';
import { ApiErrorResponse } from 'src/shared/decorator/error.decorator';
import { SWAGGER_API_PARAM_ID } from 'src/shared/const/swagger';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';
import { ALBUM_NOT_FOUND_ERROR } from 'src/routes/album/const';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @ApiOperation({ summary: 'Get all albums' })
  @AlbumSuccessResponse(HttpStatus.OK, { isArray: true })
  @Get()
  async getAll() {
    return this.albumService.getAllAlbums();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @AlbumSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Not found')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.albumService.getAlbumById(id);
  }

  @ApiOperation({ summary: 'Create album' })
  @AlbumSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'name must be a string',
    'name should not be empty',
  ])
  @ApiBody({ type: CreateAlbumDto })
  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @ApiOperation({ summary: 'Update album' })
  @AlbumSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'name must be a string',
    'name should not be empty',
  ])
  @ApiParam(SWAGGER_API_PARAM_ID)
  @ApiBody({ type: UpdateAlbumDto })
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @ApiOperation({ summary: 'Delete album' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, ALBUM_NOT_FOUND_ERROR)
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.albumService.deleteAlbum(id);
  }
}
