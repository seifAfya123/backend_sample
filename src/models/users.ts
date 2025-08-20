import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  sociallinks: {
    facebook?: string;
    x?: string;
    instagram?: string;
    linkedin?: string;
    website?: string;
  };
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'User name is requeired'],
      unique: [true, 'User name must be unique'],
      maxLength: [50, 'User name must be less than 50 characters'],
      minLength: [3, 'User name must be more than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      maxLength: [100, 'Email must be less than 100 characters'],
    },
    password: { type: String, required: [true, 'Pasword is required'] },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    sociallinks: {
      facebook: {
        type: String,
        maxlinght: [100, 'x can not be more than 100 char'],
      },
      x: { type: String, maxlinght: [100, 'x can not be more than 100 char'] },
      instagram: {
        type: String,
        maxlinght: [100, 'instagram can not be more than 100 char'],
      },
      linkedin: {
        type: String,
        maxlinght: [100, 'linkedin can not be more than 100 char'],
      },
      website: {
        type: String,
        maxlinght: [100, 'website can not be more than 100 char'],
      },
    },
  },

  { timestamps: true },
);
export default model<IUser>('User', userSchema);
