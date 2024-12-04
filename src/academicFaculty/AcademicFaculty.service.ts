import { TAcademicFaculty } from './AcademicFaculty.interface';
import { AcademicFaculty } from './AcademicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
export const academicServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
};
