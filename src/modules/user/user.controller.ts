import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import AppError from '../../errors/AppError';

// const catchAsync = (fn: RequestParamHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(200).json({
      message: 'student created successfully',
      success: true,
      data: result,
    });
    // const zodParsedData = studentValidationSchema.parse(studentData);
  } catch (error) {
    next(error);
  }
};
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(404, 'Token is not found');
    }
    const result = await UserServices.getMe(token);
    res.status(200).json({
      message: 'student created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const userController = {
  createUser,
  getMe,
};
