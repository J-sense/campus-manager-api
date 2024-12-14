import { NextFunction, Request, Response } from 'express';
import { OfferedCourseService } from './offeredCourse.service';

const createOfferedCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await OfferedCourseService.createOfferedCourseIntoDb(
      req.body,
    );
    res.status(200).json({
      message: 'Create offered course successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OfferedCourseController = {
  createOfferedCourse,
};
