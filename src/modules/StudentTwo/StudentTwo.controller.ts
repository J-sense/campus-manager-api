import { NextFunction, Request, Response } from 'express';
import { studentTwoService } from './StudentTwo.service';

const createstudentTwo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentTwoService.createStudentTwoIntoDb(req.body);
    res.status(200).json({
      message: 'Student created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const studentControllerTwo = {
  createstudentTwo,
};
