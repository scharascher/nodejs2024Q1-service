import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE, getId } from '../../database/db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ALBUM_NOT_FOUND_ERROR } from 'src/routes/album/const';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';

@Injectable()
export class AlbumService {
  async getAllAlbums() {
    return DATABASE.album;
  }
  async getAlbumById(id: string) {
    return await this.findAlbumById(id);
  }
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    DATABASE.album.push({
      id: getId(),
      ...createAlbumDto,
    });
    return DATABASE.album[DATABASE.album.length - 1];
  }
  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findAlbumById(id);
    const index = DATABASE.album.findIndex((t) => t.id === id);
    DATABASE.album[index] = { ...album, ...updateAlbumDto };
    return DATABASE.album[index];
  }
  async deleteAlbum(id: string) {
    const album = await this.findAlbumById(id);
    DATABASE.track = DATABASE.track.map((t) =>
      t.albumId === album.id ? { ...t, albumId: null } : t,
    );
    const index = DATABASE.album.findIndex((t) => t.id === id);
    DATABASE.album.splice(index, 1);
  }
  private async findAlbumById(id: string) {
    const album = DATABASE.album.find((t) => t.id === id);
    if (!album) throw new NotFoundException(ALBUM_NOT_FOUND_ERROR);
    return album;
  }
}
