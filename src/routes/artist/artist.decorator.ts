import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { ArtistDto } from 'src/routes/artist/dto/artist.dto';

export function ArtistSuccessResponse(
  statusCode: HttpStatus,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      type: ArtistDto,
    }),
  );
}
