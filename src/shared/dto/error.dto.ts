import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ErrorDTO {
  @ApiProperty({ default: 'Internal Server Error' })
  message: string | string[];
  @ApiProperty({ enum: HttpStatus, default: HttpStatus.INTERNAL_SERVER_ERROR })
  status_code: HttpStatus;
  @ApiProperty({ default: 'Error' })
  error: string;
}
