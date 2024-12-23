import { NextFunction, Request, Response } from 'express';
import { userTwoSerivece } from './Usertwo.service';

const createStudentTwo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userTwoSerivece.createStudentTwointodb(
      password,
      studentData,
    );
    res.status(200).json({
      message: 'student created from user successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userTwoController = {
  createStudentTwo,
};
