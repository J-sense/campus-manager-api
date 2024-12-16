import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import { handleZodError } from './handleZodError';

type Terr = {
  success: boolean;
  message: string | number;
  errorSource: TErrorSource;
  stack: string;
};
const globalErrorhandler = (
  err: Terr,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = err.message || 'something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplefiedError = handleZodError(err);
    statusCode = simplefiedError.statusCode;
    message = simplefiedError.message;
    errorSource = simplefiedError.errorSource;
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    stack: config.development === 'development' ? err?.stack : null,
  });
  next();
};
export default globalErrorhandler;
