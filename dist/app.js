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
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/students', student_routes_1.studentRoutes);
app.use('/api/v1/users', user_routes_1.userRoutes);
app.use('/api/v1/academic-semester', academic_routes_1.AcademicSemesterRoutes);
app.use('/api/v1/academic-faculties', AcademicFaculty_routes_1.academicFacultyRoutes);
app.use('/api/v1/academic-department', academicDepartment_routes_1.academicDepatmentRoutes);
app.use('/api/v1/course', course_routes_1.courseRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
app.use((err, req, res, next) => {
    const statuseCode = err.statusCode || 500;
    const message = err.message || 'something error wrong';
    const errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    res.status(statuseCode).json({
        success: false,
        message,
        errorSources,
    });
    next();
});
app.use(notfound_1.default);
exports.default = app;
