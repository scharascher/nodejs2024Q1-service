import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';
import { UserDto } from 'src/routes/user/dto/user.dto';

export function UserSuccessResponse(
  statusCode: HttpStatus,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      type: UserDto,
    }),
  );
}
