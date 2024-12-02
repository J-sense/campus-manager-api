import express from 'express';
import { acadeicSemesterController } from './academic.controller';
const router = express.Router();

router.post(
  '/create-academic-semester',
  acadeicSemesterController.academicSemesterCreate,
);
export const AcademicSemesterRoutes = router;
