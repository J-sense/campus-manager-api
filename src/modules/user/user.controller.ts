import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(200).json({
      message: 'student created successfully',
      success: true,
      data: result,
    });
    // const zodParsedData = studentValidationSchema.parse(studentData);
  } catch (error) {
    console.log(error);
  }
};
export const userController = {
  createUser,
};
