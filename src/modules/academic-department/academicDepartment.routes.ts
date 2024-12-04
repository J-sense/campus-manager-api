import express from 'express';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import validateMiddleware from '../../middleware/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateMiddleware(AcademicDepartmentValidation.academicDepartValidation),
  academicDepartmentController.createAcademicDepartment,
);
router.get('/', academicDepartmentController.getallAcademicDepartment);
router.get('/:id', academicDepartmentController.getSingleAcademicDepartment);
router.patch('/:id', academicDepartmentController.updateAcademicDepartment);

export const academicDepatmentRoutes = router;
