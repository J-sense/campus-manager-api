import { TAcademicFaculty } from './AcademicFaculty.interface';
import { AcademicFaculty } from './AcademicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
export const academicServices = { createAcademicFacultyIntoDB };
