import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';

const createLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.createLoginIntoDb(req.body);
    res.status(200).json({
      message: 'Login successfuly ',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.user, req.body);
  res.status(200).json({
    message: 'password change successfully',
    success: true,
    data: null,
  });
};
export const authController = {
  createLogin,
  changePassword,
};
