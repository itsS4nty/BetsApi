import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  age: number;
  userName: string;
  mail: string;
  passwd: string;
  createdAt?: Date;
  updatedAt?: Date;
}
