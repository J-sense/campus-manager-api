/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

type TerrorRespons = {
  message: string;
  success: boolean;
  error: any;
};
const globalErrorhandler = (
  err: TerrorRespons,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof mongoose.Error.CastError) {
    res.status(500).json({
      success: false,
      error: err,
      name: err.name,
      message: err.message,
    });
  } else if (err instanceof Error) {
    res.status(500).json({
      success: false,
      error: err,
      message: err.message,
    });
  }

  next();
};
export default globalErrorhandler;
