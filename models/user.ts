'server-only';

import { Model, Schema, model, models } from 'mongoose';

export type IUser = {
  _id: string;
  email: string;
  username: string;
  image?: string;
};

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  image: { type: String },
});

/**
 * The User model of the database, if it already exists, use it, otherwise create a new one
 */
const User = (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default User;
