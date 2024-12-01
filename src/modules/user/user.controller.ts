import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';

// const catchAsync = (fn: RequestParamHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };
const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
export const userController = {
  createUser,
};
