import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
router.post('/create-student', studentController.createStudent);
router.get('/', studentController.findAllStudent);
router.delete('/:studentId', studentController.deleteStudent);
router.get('/:studentId', studentController.getSingleStudent);

export const studentRoutes = router;
