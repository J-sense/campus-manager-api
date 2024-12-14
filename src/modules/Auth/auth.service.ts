import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';

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
};
export const authService = {
  createLoginIntoDb,
};