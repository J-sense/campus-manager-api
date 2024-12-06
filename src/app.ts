import express, { Application, Request, Response, NextFunction } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoutes } from './modules/student/student.routes';
import { userRoutes } from './modules/user/user.routes';

import notfound from './middleware/notfound';
import { AcademicSemesterRoutes } from './modules/academic-semester/academic.routes';
import { academicFacultyRoutes } from './modules/academicFaculty/AcademicFaculty.routes';
import { academicDepatmentRoutes } from './modules/academic-department/academicDepartment.routes';

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1/academic-faculties', academicFacultyRoutes);
app.use('/api/v1/academic-department', academicDepatmentRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statuseCode = err.statusCode || 500;
  const message = err.message || 'something error wrong';
  res.status(statuseCode).json({
    success: false,
    message,
    error: err,
  });
  next();
});
app.use(notfound);
export default app;
