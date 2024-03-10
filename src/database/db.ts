import { IUser } from '../routes/user/user.interface';
import { ITrack } from '../routes/track/track.interface';
import { v4 } from 'uuid';
import { IArtist } from '../routes/artist/artist.interface';
import { IAlbum } from '../routes/album/album.interface';
import { IFavorites } from '../routes/favorites/favorites.interface';
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
