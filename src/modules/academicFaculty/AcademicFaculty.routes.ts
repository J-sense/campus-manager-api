import express from 'express';
import { academicFacultyController } from './AcademicFaculty.controller';
import validateMiddleware from '../../middleware/validateRequest';
import AcademicFacultyVAlidation from './AcademicFaculty.validation';
const router = express.Router();
router.post(
  '/create-academic-faculties',
  validateMiddleware(AcademicFacultyVAlidation),
  academicFacultyController.createAcademicFaculty,
);
router.get('/', academicFacultyController.getallAcademicFaculty);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch('/:id', academicFacultyController.updateAcademicFaculty);

export const academicFacultyRoutes = router;
