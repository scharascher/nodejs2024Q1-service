import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DATABASE, getId } from '../../database/db';

import {
  OLD_PASSWORD_IS_WRONG_ERROR,
  USER_NOT_FOUND_ERROR,
} from 'src/routes/user/const';

@Injectable()
export class UserService {
  // constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    // const users = await this.prisma.user.findMany();
    return UserService.GetUserDto(DATABASE.user);
  }
  async getUserById(id: string) {
    const user = await this.findUserById(id);
    return UserService.GetUserDto(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = DATABASE.user.find((u) => u.login === createUserDto.login);
    if (user)
      throw new BadRequestException(
        `User with login "${createUserDto.login}" already exists`,
      );
    // const user = await this.prisma.user.create({
    //   data: {
    //     login: createUserDto.login,
    //     password: await UserService.GetPasswordHash(createUserDto.password),
    //   },
    // });
    DATABASE.user.push({
      id: getId(),
      login: createUserDto.login,
      password: await UserService.GetPasswordHash(createUserDto.password),
      createdAt: +new Date(),
      updatedAt: +new Date(),
      version: 1,
    });
    const newUser = DATABASE.user[DATABASE.user.length - 1];
    return UserService.GetUserDto(newUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findUserById(id);
    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password)))
      throw new ForbiddenException(OLD_PASSWORD_IS_WRONG_ERROR);
    // const updatedUser = await this.prisma.user.update({
    //   where: { id },
    //   data: {
    //     password: await UserService.GetPasswordHash(
    //       updatePasswordDto.newPassword,
    //     ),
    //     version: user.version + 1,
    //   },
    // });
    const index = DATABASE.user.findIndex((t) => t.id === id);
    DATABASE.user[index] = {
      ...user,
      password: await UserService.GetPasswordHash(
        updatePasswordDto.newPassword,
      ),
      version: user.version + 1,
      updatedAt: +new Date(),
    };
    const updatedUser = DATABASE.user[index];
    return UserService.GetUserDto(updatedUser);
  }
  async deleteUser(id: string) {
    await this.findUserById(id);
    // return this.prisma.user.delete({ where: { id } });
    const index = DATABASE.user.findIndex((t) => t.id === id);
    DATABASE.user.splice(index, 1);
  }

  private async findUserById(id: string) {
    // const user = await this.prisma.user.findUnique({
    //   where: { id },
    // });
    const user = DATABASE.user.find((t) => t.id === id);
    if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
    return user;
  }
  private static GetUserDto(user: unknown) {
    return plainToClass(UserDto, user, { excludeExtraneousValues: true });
  }
  private static async GetPasswordHash(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
