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
    console.log(`${req.user} text`);
    const result = await studentService.findAllStudentFromDb(req.query);
    res.status(200).json({
      message: 'Successfully get all the student',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.deleteStudentFromDB(
      req.params.studentId,
    );
    res.status(200).json({
      message: 'Student Deleted Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getsingleStudent(req.params.id);
    res.status(200).json({
      message: 'successfully get the student',
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
  deleteStudent,
  getSingleStudent,
};
