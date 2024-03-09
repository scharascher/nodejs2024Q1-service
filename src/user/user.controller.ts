import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UUID_VERSION } from '../shared/const/uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private user: UserService) {}
  @Get()
  async users() {
    return this.user.getAllUsers();
  }
  @Get(':id')
  async userById(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.user.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.user.createUser(createUserDto);
    console.log(user);
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
    @Body() createUserDto: UpdatePasswordDto,
  ) {
    return this.user.updatePassword(id, createUserDto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: `${UUID_VERSION}` }))
    id: string,
  ) {
    return this.user.deleteUser(id);
  }
}
