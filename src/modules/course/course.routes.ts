import express from 'express';
import { courseController } from './course.controller';
import validateMiddleware from '../../middleware/validateRequest';
import { courserValidation } from './course.validation';

const router = express.Router();
router.post(
  '/create-course',
  validateMiddleware(courserValidation.createCourseValidationSchema),
  courseController.createCourse,
);
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deleteCourse);
router.patch(
  '/:id',
  validateMiddleware(courserValidation.updatedCourseValidationSchema),
  courseController.updatedCourse,
);
router.put('/:courseId/assign-faculties', courseController.assignFacultis);
export const courseRoutes = router;
