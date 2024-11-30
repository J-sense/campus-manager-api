import { Request, Response } from 'express';
import { studentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    console.log(studentData);
    const result = await studentService.createStudentOnDb(studentData);
    res.status(200).json({
      message: 'Create Student Account Successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const studentController = {
  createStudent,
};
