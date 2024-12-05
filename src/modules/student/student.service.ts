import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentOnDb = async (studentData: TStudent) => {
  const result = await StudentModel.create(studentData);
  return result;
};
const findAllStudentFromDb = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate('academicDepartment');
  return result;
};
export const studentService = {
  createStudentOnDb,
  findAllStudentFromDb,
};
