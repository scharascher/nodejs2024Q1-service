import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

import {
  OLD_PASSWORD_IS_WRONG_ERROR,
  USER_NOT_FOUND_ERROR,
} from 'src/routes/user/const';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return UserService.GetUserDto(users);
  }
  async getUserById(id: string) {
    const user = await this.findUserById(id);
    return UserService.GetUserDto(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: createUserDto.login,
      },
    });
    if (user)
      throw new BadRequestException(
        `User with login "${createUserDto.login}" already exists`,
      );
    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: await UserService.GetPasswordHash(createUserDto.password),
      },
    });
    return UserService.GetUserDto(newUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findUserById(id);
    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password)))
      throw new ForbiddenException(OLD_PASSWORD_IS_WRONG_ERROR);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: await UserService.GetPasswordHash(
          updatePasswordDto.newPassword,
        ),
        version: user.version + 1,
      },
    });
    return UserService.GetUserDto(updatedUser);
  }
  async deleteUser(id: string) {
    await this.findUserById(id);
    await this.prisma.user.delete({ where: { id } });
  }

  private async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
    return user;
  }
  private static GetUserDto(user: unknown) {
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }
  private static async GetPasswordHash(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
