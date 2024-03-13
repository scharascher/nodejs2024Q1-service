import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ARTIST_NOT_FOUND_ERROR } from 'src/routes/artist/const';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { plainToInstance } from 'class-transformer';
import { ArtistDto } from 'src/routes/artist/dto/artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumDto } from 'src/routes/album/dto/album.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async getAllArtists() {
    return plainToInstance(ArtistDto, await this.prisma.artist.findMany());
  }
  async getArtistById(id: string) {
    const artist = await this.findArtistById(id);
    return plainToInstance(ArtistDto, artist);
  }
  async createArtist(createArtistDto: CreateArtistDto) {
    return plainToInstance(
      AlbumDto,
      await this.prisma.artist.create({
        data: createArtistDto,
      }),
    );
  }
  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findArtistById(id);
    return plainToInstance(
      AlbumDto,
      await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      }),
    );
  }
  async deleteArtist(id: string) {
    await this.findArtistById(id);
    await this.prisma.artist.delete({
      where: { id },
    });
  }
  private async findArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) throw new NotFoundException(ARTIST_NOT_FOUND_ERROR);
    return artist;
  }
}
