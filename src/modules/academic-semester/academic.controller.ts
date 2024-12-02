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
export const acadeicSemesterController = {
  academicSemesterCreate,
};
