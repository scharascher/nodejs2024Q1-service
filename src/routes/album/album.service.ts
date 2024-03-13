import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ALBUM_NOT_FOUND_ERROR } from 'src/routes/album/const';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { AlbumDto } from 'src/routes/album/dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async getAllAlbums() {
    return plainToInstance(AlbumDto, await this.prisma.album.findMany());
  }
  async getAlbumById(id: string) {
    return plainToInstance(AlbumDto, await this.findAlbumById(id));
  }
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return plainToInstance(
      AlbumDto,
      await this.prisma.album.create({
        data: createAlbumDto,
      }),
    );
  }
  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findAlbumById(id);
    return plainToInstance(
      AlbumDto,
      await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      }),
    );
  }
  async deleteAlbum(id: string) {
    await this.findAlbumById(id);
    await this.prisma.album.delete({
      where: { id },
    });
  }
  private async findAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) throw new NotFoundException(ALBUM_NOT_FOUND_ERROR);
    return album;
  }
}
