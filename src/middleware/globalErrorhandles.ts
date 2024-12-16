import { path } from 'path';
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Request, Response, NextFunction } from 'express';
// import mongoose from 'mongoose';

import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

// type TerrorRespons = {
//   message: string;
//   success: boolean;
//   error: any;
// };
// const globalErrorhandler = (
//   err: TerrorRespons | Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   if (err instanceof mongoose.Error.CastError) {
//     res.status(500).json({
//       success: false,
//       error: err,
//       name: err.name,
//       message: err.message,
//     });
//   } else if ((err as any).code && (err as any).code === 11000) {
//     res.status(500).json({
//       success: false,
//       error: err,
//       message: (err as any).message,
//     });
//   } else if (err instanceof mongoose.Error.ValidationError) {
//     res.status(500).json({
//       success: false,
//       error: err,
//       name: err.name,
//       message: err.message,
//     });
//   } else if (err instanceof Error) {
//     res.status(500).json({
//       success: false,
//       error: err,
//       message: err.message,
//     });
//   } else {
//     res.status(500).json({
//       success: false,

//       message: 'An unknown error occurred',
//     });
//   }

//   next();
// };

// export default globalErrorhandler;

type Terr = {
  success: boolean;
  message: string | number;
  errorSource: TErrorSource;
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
  const handleZodError = (err: ZodError) => {
    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: 'Zod Validation Error',
      errorSource,
    };
  };
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
  });
  next();
};
export default globalErrorhandler;
