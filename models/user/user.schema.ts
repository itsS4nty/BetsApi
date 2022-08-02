import { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  userName: String,
  mail: {
    type: String,
    unique: true,
  },
  passwd:  String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

export default UserSchema;