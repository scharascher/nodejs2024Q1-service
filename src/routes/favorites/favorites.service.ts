import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DATABASE } from '../../database/db';
import { FavoritesResponse } from './favorites.interface';

@Injectable()
export class FavoritesService {
  async getFavorites(): Promise<FavoritesResponse> {
    return {
      albums: DATABASE.favorites.albums
        .map((albumId) => DATABASE.album.find((a) => a.id === albumId)!)
        .filter((t) => !!t),
      artists: DATABASE.favorites.artists
        .map((artistId) => DATABASE.artist.find((a) => a.id === artistId)!)
        .filter((t) => !!t),
      tracks: DATABASE.favorites.tracks
        .map((trackId) => DATABASE.track.find((t) => t.id === trackId)!)
        .filter((t) => !!t),
    };
  }
  async addArtist(id) {
    const obj = await this.findById('artist', id);
    if (!obj) throw new UnprocessableEntityException("Artist doesn't exist");
    DATABASE.favorites.artists.push(id);
    return 'Success';
  }
  async addAlbum(id) {
    const obj = await this.findById('album', id);
    if (!obj) throw new UnprocessableEntityException("Album doesn't exist");
    DATABASE.favorites.albums.push(id);
    return 'Success';
  }
  async addTrack(id) {
    const obj = await this.findById('track', id);
    if (!obj) throw new UnprocessableEntityException("Track doesn't exist");
    DATABASE.favorites.tracks.push(id);
    return 'Success';
  }
  async deleteArtist(id: string) {
    const obj = await this.findById('artist', id);
    if (!obj) throw new NotFoundException('Artist is not in favorites');
    const index = DATABASE.favorites.artists.findIndex((t) => t === id);
    DATABASE.favorites.artists.splice(index, 1);
  }
  async deleteAlbum(id: string) {
    const obj = await this.findById('album', id);
    if (!obj) throw new NotFoundException('Album is not in favorites');
    const index = DATABASE.favorites.albums.findIndex((t) => t === id);
    DATABASE.favorites.albums.splice(index, 1);
  }
  async deleteTrack(id: string) {
    const obj = await this.findById('track', id);
    if (!obj) throw new NotFoundException('Track is not in favorites');
    const index = DATABASE.favorites.tracks.findIndex((t) => t === id);
    DATABASE.favorites.tracks.splice(index, 1);
  }

  private async findById(entity: 'track' | 'artist' | 'album', id: string) {
    const arr = DATABASE[entity] as { id: string }[];
    return arr.find((t) => t.id === id);
  }
}
