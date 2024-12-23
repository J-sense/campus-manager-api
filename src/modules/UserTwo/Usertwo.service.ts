import config from '../../config';
import { TStudentTwo } from '../StudentTwo/StudentTwo.interface';
import { StudentTwo } from '../StudentTwo/StudentTwo.model';

const createStudentTwointodb = async (
  password: string,
  studentData: TStudentTwo,
) => {
  if (!password) {
    password = config.default_password as string;
  }
  //   set role
  
  const result = await StudentTwo.create(studentData);
  return result;
};
export const userTwoSerivece = {
  createStudentTwointodb,
};
