import { UserTwo } from '../UserTwo/Usertwo.model';
import { TStudentTwo } from './StudentTwo.interface';

const createStudentTwoIntoDb = async (studentData: TStudentTwo) => {
  const result = await UserTwo.create(studentData);
  return result;
};
export const studentTwoService = {
  createStudentTwoIntoDb,
};
