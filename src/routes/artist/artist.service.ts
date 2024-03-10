import { Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE, getId } from '../../database/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ARTIST_NOT_FOUND_ERROR } from 'src/routes/artist/const';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';

@Injectable()
export class ArtistService {
  async getAllArtists() {
    return DATABASE.artist;
  }
  async getArtistById(id: string) {
    return await this.findArtistById(id);
  }
  async createArtist(createArtistDto: CreateArtistDto) {
    DATABASE.artist.push({
      id: getId(),
      ...createArtistDto,
      grammy: createArtistDto.grammy || false,
    });
    return DATABASE.artist[DATABASE.artist.length - 1];
  }
  async updateArtist(id: string, createArtistDto: UpdateArtistDto) {
    const artist = await this.findArtistById(id);
    const index = DATABASE.artist.findIndex((t) => t.id === id);
    DATABASE.artist[index] = { ...artist, ...createArtistDto };
    return DATABASE.artist[index];
  }
  async deleteArtist(id: string) {
    const artist = await this.findArtistById(id);
    DATABASE.album = DATABASE.album.map((a) =>
      a.artistId === artist.id ? { ...a, artistId: null } : a,
    );
    DATABASE.track = DATABASE.track.map((t) =>
      t.artistId === artist.id ? { ...t, artistId: null } : t,
    );
    const index = DATABASE.artist.findIndex((t) => t.id === id);
    DATABASE.artist.splice(index, 1);
  }
  private async findArtistById(id: string) {
    const artist = DATABASE.artist.find((t) => t.id === id);
    if (!artist) throw new NotFoundException(ARTIST_NOT_FOUND_ERROR);
    return artist;
  }
}
