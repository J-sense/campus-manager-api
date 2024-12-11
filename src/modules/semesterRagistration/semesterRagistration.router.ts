import express from 'express';
import { semesterRegistrationController } from './semesterRagistration.controller';
import validateMiddleware from '../../middleware/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
const router = express.Router();

router.post(
  '/created-semesterRegistration',
  validateMiddleware(
    semesterRegistrationValidation.createSemesterRagistrationValidation,
  ),
  semesterRegistrationController.createSemesterRegistration,
);
router.get('/', semesterRegistrationController.getallSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
