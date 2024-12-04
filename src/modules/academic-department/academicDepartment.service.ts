import { TacademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.modal';

const createAcademicDepartmentIntoDB = async (payload: TacademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const updateAcademicDepartment = async (
  id: string,
  payload: TacademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
