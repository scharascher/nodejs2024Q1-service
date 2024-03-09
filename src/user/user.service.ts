import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '@prisma/client';

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
      where: { login: createUserDto.login },
    });
    if (user)
      throw new BadRequestException(
        `User with login "${createUserDto.login}" already exists`,
      );

    return UserService.GetUserDto(
      await this.prisma.user.create({
        data: {
          login: createUserDto.login,
          password: await UserService.GetPasswordHash(createUserDto.password),
        },
      }),
    );
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findUserById(id);
    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password)))
      throw new ForbiddenException('Old password is wrong');
    return UserService.GetUserDto(
      await this.prisma.user.update({
        where: { id },
        data: {
          password: await UserService.GetPasswordHash(
            updatePasswordDto.newPassword,
          ),
          version: user.version + 1,
        },
      }),
    );
  }
  async deleteUser(id: string) {
    await this.findUserById(id);
    return this.prisma.user.delete({ where: { id } });
  }

  private async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }
  private static GetUserDto(user: User | User[]) {
    return plainToClass(UserDto, user, { excludeExtraneousValues: true });
  }
  private static async GetPasswordHash(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
