import { User } from '@prisma/client';
import { IUser } from '../user/user.interface';
import { ITrack } from '../track/track.interface';
import { v4 } from 'uuid';
import { IArtist } from '../artist/artist.interface';
import { IAlbum } from '../album/album.interface';
import { IFavorites } from '../favorites/favorites.interface';
export const DATABASE: {
  user: IUser[];
  track: ITrack[];
  artist: IArtist[];
  album: IAlbum[];
  favorites: IFavorites;
} = {
  user: [],
  track: [],
  album: [],
  artist: [],
  favorites: {
    albums: [],
    tracks: [],
    artists: [],
  },
};

export const getId = () => v4();
