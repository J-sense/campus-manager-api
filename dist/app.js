"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const student_routes_1 = require("./modules/student/student.routes");
const user_routes_1 = require("./modules/user/user.routes");
const notfound_1 = __importDefault(require("./middleware/notfound"));
const academic_routes_1 = require("./modules/academic-semester/academic.routes");
const AcademicFaculty_routes_1 = require("./modules/academicFaculty/AcademicFaculty.routes");
const academicDepartment_routes_1 = require("./modules/academic-department/academicDepartment.routes");
const course_routes_1 = require("./modules/course/course.routes");
const semesterRagistration_router_1 = require("./modules/semesterRagistration/semesterRagistration.router");
const offeredCourse_router_1 = require("./modules/offeredCourse/offeredCourse.router");
const auth_routes_1 = require("./modules/Auth/auth.routes");
const globalErrorhandles_1 = __importDefault(require("./middleware/globalErrorhandles"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/auth', auth_routes_1.authRoutes);
app.use('/api/v1/students', student_routes_1.studentRoutes);
app.use('/api/v1/users', user_routes_1.userRoutes);
app.use('/api/v1/academic-semester', academic_routes_1.AcademicSemesterRoutes);
app.use('/api/v1/academic-faculties', AcademicFaculty_routes_1.academicFacultyRoutes);
app.use('/api/v1/academic-department', academicDepartment_routes_1.academicDepatmentRoutes);
app.use('/api/v1/semester-registration', semesterRagistration_router_1.semesterRegistrationRoutes);
app.use('/api/v1/course', course_routes_1.courseRoutes);
app.use('/api/v1/offeredCourse', offeredCourse_router_1.OfferedCourseRoutes);
app.get('/', (req, res) => {
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
app.use(notfound_1.default);
app.use(globalErrorhandles_1.default);
exports.default = app;
