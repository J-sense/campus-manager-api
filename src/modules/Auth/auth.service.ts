import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sentEmail } from '../../utils/sentEmail';
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
    isUserExist.password,
    payload?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Password did not matched');
  }
  const JwtPayload = {
    userId: isUserExist.id,
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
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Fetch the user by ID
  const userExist = await User.findOne({ id: userData.userId });

  if (!userExist) {
    throw new AppError(404, 'User not found');
  }

  // Check user status and deletion state
  if (userExist.status === 'blocked') {
    throw new AppError(403, 'This user is blocked');
  }

  if (userExist.isDeleted) {
    throw new AppError(410, 'This user is already deleted');
  }

  // Verify old password
  const isPasswordMatch = await bcrypt.compare(
    payload.oldPassword,
    userExist.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(400, 'Old password is incorrect');
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  // Update the user's password
  userExist.password = hashedPassword;
  await userExist.save();

  return { message: 'Password changed successfully' };
};
const forgetPassword = async (userId: string) => {
  const isUserExist = await User.findOne({ id: userId });
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
  const JwtPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(JwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10m',
  });
  console.log(accessToken);
  const resetUILink = `http://localhost:5000?id==${isUserExist.id}&token=${accessToken}`;
  sentEmail(isUserExist.email, resetUILink);
};

export const authService = {
  createLoginIntoDb,
  changePassword,
  forgetPassword,
};
