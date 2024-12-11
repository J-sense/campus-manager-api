import { Request, Response, NextFunction } from 'express';
import { semesterRegistrationSErvice } from './semesterRagistration.service';

const createSemesterRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await semesterRegistrationSErvice.createSemester(req.body);
    res.status(200).json({
      message: 'Registration semester is created successfully',
      succsess: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getallSemesterRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await semesterRegistrationSErvice.getAllSemester(req.query);
    res.status(200).json({
      message: 'Semester Registration retrived successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleSemesterRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await semesterRegistrationSErvice.getSingleSemester(
      req.params.id,
    );
    res.status(200).json({
      message: 'Get single Semester Registration retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const semesterRegistrationController = {
  createSemesterRegistration,
  getallSemesterRegistration,
  getSingleSemesterRegistration,
};
