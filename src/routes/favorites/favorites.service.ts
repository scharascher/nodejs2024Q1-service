import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from './favorites.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  async getFavorites(): Promise<FavoritesResponse> {
    const [wrappedAlbums, wrappedArtists, wrappedTracks] = await Promise.all([
      this.prisma.favAlbums.findMany({
        select: {
          album: true,
        },
      }),
      this.prisma.favArtists.findMany({
        select: {
          artist: true,
        },
      }),
      this.prisma.favTracks.findMany({
        select: {
          track: true,
        },
      }),
    ]);
    const artists = wrappedArtists.map((a) => a.artist);
    const albums = wrappedAlbums.map((a) => a.album);
    const tracks = wrappedTracks.map((a) => a.track);
    return { artists, albums, tracks };
  }

  async addArtist(id) {
    const obj = await this.findModelById('artist', id);
    if (!obj) throw new UnprocessableEntityException("Artist doesn't exist");
    await this.prisma.favArtists.create({ data: { artistId: id } });
    return 'Success';
  }
  async addAlbum(id) {
    const obj = await this.findModelById('album', id);
    if (!obj) throw new UnprocessableEntityException("Album doesn't exist");
    await this.prisma.favAlbums.create({ data: { albumId: id } });
    return 'Success';
  }
  async addTrack(id) {
    const obj = await this.findModelById('track', id);
    if (!obj) throw new UnprocessableEntityException("Track doesn't exist");
    const track = await this.prisma.favTracks.create({ data: { trackId: id } });
    console.log({ track });
    return 'Success';
  }
  async deleteArtist(id: string) {
    const obj = await this.findFavoriteById('artist', id);
    if (!obj) throw new NotFoundException('Artist is not in favorites');
    await this.prisma.favArtists.delete({ where: { artistId: id } });
  }
  async deleteAlbum(id: string) {
    const obj = await this.findFavoriteById('album', id);
    if (!obj) throw new NotFoundException('Album is not in favorites');
    await this.prisma.favAlbums.delete({ where: { albumId: id } });
  }
  async deleteTrack(id: string) {
    const obj = await this.findFavoriteById('track', id);
    if (!obj) throw new NotFoundException('Track is not in favorites');
    await this.prisma.favTracks.delete({ where: { trackId: id } });
  }
  private async findModelById(
    entity: 'track' | 'artist' | 'album',
    id: string,
  ) {
    switch (entity) {
      case 'album':
        return this.prisma.album.findUnique({
          where: { id },
        });
      case 'track':
        return this.prisma.track.findUnique({
          where: { id },
        });
      case 'artist':
        return this.prisma.artist.findUnique({
          where: { id },
        });
    }
  }
  private async findFavoriteById(
    entity: 'track' | 'artist' | 'album',
    id: string,
  ) {
    switch (entity) {
      case 'album':
        return this.prisma.favAlbums.findUnique({
          where: { albumId: id },
        });
      case 'track':
        return this.prisma.favTracks.findUnique({
          where: { trackId: id },
        });
      case 'artist':
        return this.prisma.favArtists.findUnique({
          where: { artistId: id },
        });
    }
  }
}
