import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { TrackDto } from 'src/routes/track/dto/track.dto';

export function TrackSuccessResponse(
  statusCode: HttpStatus,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      type: TrackDto,
    }),
  );
}
