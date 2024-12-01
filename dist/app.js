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
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/students', student_routes_1.studentRoutes);
app.use('/api/v1/users', user_routes_1.userRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
app.use((err, req, res, next) => {
    const statuseCode = 500;
    const message = err.message || 'something error wrong';
    res.status(statuseCode).json({
        success: false,
        message,
        error: err,
    });
    next();
});
exports.default = app;
