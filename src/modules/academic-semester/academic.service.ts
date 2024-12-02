import { acadeicSemester } from './academic.interface';
import { academicModel } from './academic.model';

const createAcademicSemesterIntoDb = async (payload: acadeicSemester) => {
  const result = await academicModel.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
};
