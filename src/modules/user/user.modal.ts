import { model, Schema } from 'mongoose';
import { Tuser } from './user.interface';
// import { boolean, string } from 'zod';

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      types: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      types: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const UserModel = model<Tuser>('User', userSchema);
