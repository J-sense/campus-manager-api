import jwt, { JwtPayload } from 'jsonwebtoken';
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { academicModel } from '../academic-semester/academic.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // Set password
  userData.password = password || (config.default_password as string);

  // Set student role
  userData.role = 'student';
  userData.email = studentData.email;

  // Find academic semester info
  const admissionSemester = await academicModel.findById(
    studentData.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Academic semester not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Generate user ID
    userData.id = await generateStudentId(admissionSemester);
    const newUser = await User.create([userData], { session });

    // Create a new student
    if (!newUser.length) {
      throw new AppError(404, 'Failed to create user');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id; // Set reference to user's _id

    const newStudent = await StudentModel.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(404, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};
const getMe = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt_access_secret as string);
  const { userId, role } = decoded as JwtPayload;
  console.log(decoded.userId, decoded.role);
  return {};
};
export const UserServices = {
  createStudentIntoDB,
  getMe,
};
