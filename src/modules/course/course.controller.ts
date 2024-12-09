import { Request, Response, NextFunction } from 'express';
import { courseService } from './course.service';

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await courseService.createCourseIntoDb(req.body);
    res.status(200).json({
      message: 'Course Created Successfully',
      success: true,
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await courseService.getAllFromDb(req.query);
    res.status(200).json({
      message: 'Get all course successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await courseService.getSingleFromDb(req.params.id);
    res.status(200).json({
      message: 'Get single course successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await courseService.deleteCourseFromDb(req.params.id);
    res.status(200).json({
      message: 'Get single course successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
