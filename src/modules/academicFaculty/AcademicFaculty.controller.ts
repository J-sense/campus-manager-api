import { NextFunction, Request, Response } from 'express';
import { academicFacultyServices } from './AcademicFaculty.service';
const createAcademicFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );
    res.status(200).json({
      message: 'Created Academic Faculty Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getallAcademicFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicFacultyServices.getAllAcademicFaculty();
    res.status(200).json({
      message: 'Get all Academic Faculty Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleAcademicFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicFacultyServices.getSingleAcademicFaculty(
      req.params.id,
    );
    res.status(200).json({
      message: 'Get single Academic Faculty Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateAcademicFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicFacultyServices.updateAcademicFaculty(
      req.params.id,
      req.body,
    );
    res.status(200).json({
      message: ' Academic Faculty is updated Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const academicFacultyController = {
  createAcademicFaculty,
  getallAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
