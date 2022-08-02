import { model } from 'mongoose';
import { IUser } from './user.interface';
import UserSchema from './user.schema';

export const User = model<IUser>('user', UserSchema);