import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';
// import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

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
  try {
    // Ensure the user is attached to the request object
    if (!req.user) {
      throw new AppError(401, 'You are not authorized');
    }

    const { ...passwordData } = req.body;

    // Call the service to change the password
    const result = await authService.changePassword(req.user, passwordData);

    res.status(200).json({
      message: 'Password changed successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    const result = await authService.forgetPassword(id);
    res.status(200).json({
      message: 'forget password changed link create successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const authController = {
  createLogin,
  changePassword,
  forgetPassword,
};
