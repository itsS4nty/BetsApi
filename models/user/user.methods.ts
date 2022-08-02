import { Document, MongooseError } from 'mongoose';
import { IUser } from './user.interface';
import { User } from './user.model';

export async function getUserByMail(mail: string): Promise<IUser | null> {
    return User.findOne({ mail: mail }).then((user) => user);
}

export async function setLastUpdated(user: IUser): Promise<void> {
    user.updatedAt = new Date();
    user.save();
}

export async function sameLastName(user: IUser): Promise<Document[]> {
    return user.$model('user').find({ lastName: user.lastName });
}
