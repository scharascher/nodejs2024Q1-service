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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UUID_VERSION } from '../../shared/const/uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SWAGGER_API_PARAM_ID } from '../../shared/const/swagger';
import { ApiErrorResponse } from 'src/shared/decorator/error.decorator';
import { UserSuccessResponse } from 'src/routes/user/user.decorator';
import { USER_NOT_FOUND_ERROR } from 'src/routes/user/const';
import { OLD_PASSWORD_IS_WRONG_ERROR } from 'src/routes/user/const';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @UserSuccessResponse(HttpStatus.OK, { isArray: true })
  @Get()
  async users() {
    return this.user.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @UserSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Not found')
  @ApiParam(SWAGGER_API_PARAM_ID)
  @Get(':id')
  async userById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.user.getUserById(id);
  }

  @ApiOperation({ summary: 'Create user' })
  @UserSuccessResponse(HttpStatus.CREATED)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'User with login "your_login" already exists',
  )
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, [
    'password must be longer than or equal to 2 characters',
    'password must be a string',
    'password should not be empty',
  ])
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.user.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update password' })
  @UserSuccessResponse(HttpStatus.OK)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, USER_NOT_FOUND_ERROR)
  @ApiErrorResponse(HttpStatus.FORBIDDEN, OLD_PASSWORD_IS_WRONG_ERROR)
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() createUserDto: UpdatePasswordDto,
  ) {
    return this.user.updatePassword(id, createUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UserSuccessResponse(HttpStatus.NO_CONTENT)
  @ApiErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Validation failed (uuid v 4 is expected)',
  )
  @ApiErrorResponse(HttpStatus.NOT_FOUND, USER_NOT_FOUND_ERROR)
  @ApiParam(SWAGGER_API_PARAM_ID)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.user.deleteUser(id);
  }
}
