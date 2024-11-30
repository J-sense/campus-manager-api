import { Request, Response } from 'express';
import { userService } from './user.service';

const creteStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const result = await userService.createStudentIntoDb(studentData);
    res.status(200).json({
      success: true,
      message: 'Student Create Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const userController = {
  creteStudent,
};
