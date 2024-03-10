import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorDTO } from 'src/shared/dto/error.dto';
import { getReasonPhrase } from 'http-status-codes';

export function ApiErrorResponse(
  statusCode: HttpStatus,
  message: string | string[],
  description?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: description,
      schema: {
        default: {
          message: message,
          status_code: statusCode,
          error: getReasonPhrase(statusCode),
        },
        type: getSchemaPath(ErrorDTO),
      },
    }),
  );
}
