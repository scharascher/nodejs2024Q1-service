import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { AlbumDto } from 'src/routes/album/dto/album.dto';

export function AlbumSuccessResponse(
  statusCode: HttpStatus,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      type: AlbumDto,
    }),
  );
}
