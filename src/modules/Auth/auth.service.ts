import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const createLoginIntoDb = async (payload: TLogin) => {
  const isUserExist = await User.findOne({ id: payload.id });
  if (!isUserExist) {
    throw new AppError(404, 'this user is not exits ');
  }
  const isDeleted = isUserExist.isDeleted;
  if (isDeleted) {
    throw new AppError(404, 'this user is already deleted ');
  }
  const userStatus = isUserExist?.status;
  if (userStatus === 'blocked') {
    throw new AppError(404, 'This user is blocked');
  }
  const isPasswordMatch = bcrypt.compare(
    payload?.password,
    isUserExist.password,
  );
  const JwtPayload = {
    userId: isUserExist,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(JwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
  };
};

export const authService = {
  createLoginIntoDb,
};
