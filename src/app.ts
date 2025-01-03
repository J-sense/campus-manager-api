import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRoutes } from './modules/student/student.routes';
import { userRoutes } from './modules/user/user.routes';

import notfound from './middleware/notfound';
import { AcademicSemesterRoutes } from './modules/academic-semester/academic.routes';
import { academicFacultyRoutes } from './modules/academicFaculty/AcademicFaculty.routes';
import { academicDepatmentRoutes } from './modules/academic-department/academicDepartment.routes';
import { courseRoutes } from './modules/course/course.routes';
import { semesterRegistrationRoutes } from './modules/semesterRagistration/semesterRagistration.router';
import { OfferedCourseRoutes } from './modules/offeredCourse/offeredCourse.router';
import { authRoutes } from './modules/Auth/auth.routes';
import globalErrorhandler from './middleware/globalErrorhandles';

import { userTwoRoutes } from './modules/UserTwo/Usertwo.Routes';

app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/usersTwo', userTwoRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/academic-semester', AcademicSemesterRoutes);
app.use('/api/v1/academic-faculties', academicFacultyRoutes);
app.use('/api/v1/academic-department', academicDepatmentRoutes);
app.use('/api/v1/semester-registration', semesterRegistrationRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/offeredCourse', OfferedCourseRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   let statuseCode = err.statusCode || 500;
//   let message = err.message || 'something error wrong';
//   type TerrorSources = {
//     path: string | number;
//     message: string;
//   }[];
//   const errorSource: TerrorSources = [
//     {
//       path: '',
//       message: 'something went wrong',
//     },
//   ];

//   if (err instanceof ZodError) {
//     statuseCode = 400;
//     message = 'Something went wrong';
//   }
//   res.status(statuseCode).json({
//     success: false,
//     message,
//     errorSource,
//     error: err,
//   });
//   next();
// });
app.use(notfound);
app.use(globalErrorhandler);
export default app;
