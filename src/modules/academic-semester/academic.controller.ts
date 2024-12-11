import { NextFunction, Request, Response } from 'express';
import { academicSemesterServices } from './academic.service';

const academicSemesterCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicSemesterServices.createAcademicSemesterIntoDb(
      req.body,
    );
    res.status(200).json({
      message: 'Academic semester is created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getallacademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicSemesterServices.getallAcademicSemester();
    res.status(200).json({
      message: 'Successfully rettrive all Academic semester',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const singelAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result =
      await academicSemesterServices.singleAcademicSemesterFromDb(id);
    res.status(200).json({
      message: 'Get the semester successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const acadeicSemesterController = {
  academicSemesterCreate,
  singelAcademicSemester,
  getallacademicSemester,
};
