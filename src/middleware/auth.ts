import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../errors/AppError';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  jwt.verify(
    authorizationHeader,
    config.jwt_access_secret as string,
    function (err, decoded) {
      if (err) {
        throw new AppError(401, 'You are not authorized');
      }
      console.log('Decoded Payload:', decoded);

      next();
    },
  );
  next();
};

export default auth;
