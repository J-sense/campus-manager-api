import config from '../../config';
import { NewUser, Tuser } from './user.interface';
import { UserModel } from './user.modal';

const createStudentIntoDb = async (password: string, studentData: Tuser) => {
  const user: NewUser = {};
  user.password = password || (config.default_password as string);
  user.role = 'student';
  user.id = '203020100000';

  const result = await UserModel.create(user);
  if (Object.keys(studentData).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }
  return result;
};
export const userService = {
  createStudentIntoDb,
};
