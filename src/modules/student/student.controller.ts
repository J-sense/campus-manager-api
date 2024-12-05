import { Request, Response, NextFunction } from 'express';
import { studentService } from './student.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentData = req.body.student;

    const result = await studentService.createStudentOnDb(studentData);
    res.status(200).json({
      message: 'Create Student Account Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const findAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.findAllStudentFromDb();
    res.status(200).json({
      message: 'Successfully get all the student',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const studentController = {
  createStudent,
  findAllStudent,
};
