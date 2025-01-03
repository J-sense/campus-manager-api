import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';
const router = express.Router();
router.post(
  '/create-offered-course',
  OfferedCourseController.createOfferedCourse,
);
export const OfferedCourseRoutes = router;
