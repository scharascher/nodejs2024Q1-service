import { User } from '@prisma/client';
import { IUser } from '../user/user.interface';
import { ITrack } from '../track/track.interface';
import { v4 } from 'uuid';
export const DATABASE: { user: IUser[]; track: ITrack[] } = {
  user: [],
  track: [],
};

export const getId = () => v4();
