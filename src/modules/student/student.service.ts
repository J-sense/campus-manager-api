import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { QueryBuilder } from '../../Builder/QueryBuilder';

const createStudentOnDb = async (studentData: TStudent) => {
  const result = await StudentModel.create(studentData);
  return result;
};
const findAllStudentFromDb = async (query: Record<string, unknown>) => {
  console.log(query);

  // {email: {$regex:searchTerm,$options:"i"}}
  // const queryObj = { ...query };
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  const searchFileds = ['email', 'name.firstName', 'guardian.firstName'];
  // const searchQuery = StudentModel.find({
  //   $or: searchFileds.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'skip'];
  // excludeFields.forEach((el) => delete queryObj[el]);

  // // const searchQuery = StudentModel.find({
  // //   $or: ['email', 'name.firstName', 'guardian.firstName'].map((field) => ({
  // //     [field]: { $regex: searchTerm, $options: 'i' },
  // //   })),
  // // });
  // console.log(queryObj);
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let limit = 1;
  // const page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   skip = Number(page - 1) * skip;
  // }
  // const PageQuery = sortQuery.skip(skip);
  // const limitQuery = await PageQuery.limit(limit);
  // return limitQuery;
  const studentQuery = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchFileds)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(404, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(404, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
    console.log(err);
  }
};
const getsingleStudent = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  if (!result) {
    throw new AppError(404, 'Student Not exists');
  }
  return result;
};
export const studentService = {
  createStudentOnDb,
  findAllStudentFromDb,
  deleteStudentFromDB,
  getsingleStudent,
};
