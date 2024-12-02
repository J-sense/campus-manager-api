import { acadeicSemester } from './academic.interface';
import { academicModel } from './academic.model';

const createAcademicSemesterIntoDb = async (payload: acadeicSemester) => {
  const academicSemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Semester code is not valid');
  }
  const result = await academicModel.create(payload);
  return result;
};

const singleAcademicSemesterFromDb = async (id: string) => {
  const result = await academicModel.findById(id);
  return result;
};
export const academicSemesterServices = {
  createAcademicSemesterIntoDb,
  singleAcademicSemesterFromDb,
};
