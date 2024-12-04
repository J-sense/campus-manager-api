import { NextFunction, Request, Response } from 'express';
import { academicDepartmentServices } from './academicDepartment.service';
const createAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    res.status(200).json({
      message: 'Created Academic Faculty Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getallAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicDepartmentServices.getAllAcademicDepartment();
    res.status(200).json({
      message: 'Get all Academic Faculty Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicDepartmentServices.getSingleAcademicDepartment(
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
const updateAcademicDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await academicDepartmentServices.updateAcademicDepartment(
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

export const academicDepartmentController = {
  createAcademicDepartment,
  getallAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
