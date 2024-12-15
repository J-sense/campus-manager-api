import { NextFunction, Request, Response } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  console.log('Authorization Header:', authorizationHeader);
  next();
};

export default auth;
