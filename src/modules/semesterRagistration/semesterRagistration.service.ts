import { QueryBuilder } from '../../Builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { academicModel } from '../academic-semester/academic.model';
import { TSemesterRagistration } from './semesterRagistration.interface';
import { SemesterRegistration } from './semesterRagistrationValidation.model';

const createSemester = async (payload: TSemesterRagistration) => {
  const academicSemester = payload?.academicSemester;
  const isExitsSemester = await academicModel.findById(academicSemester);
  if (!isExitsSemester) {
    throw new AppError(404, 'This academic semester is not found');
  }
  const isSemesterAlreadyExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterAlreadyExists) {
    throw new AppError(501, 'This semester is already exists');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemester = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = await new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemester = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

export const semesterRegistrationSErvice = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};
