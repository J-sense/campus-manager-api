import express from 'express';
import validateMiddleware from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';
const router = express.Router();
router.post(
  '/login',
  validateMiddleware(AuthValidation.loginValidation),
  authController.createLogin,
);
router.post(
  '/change-password',
  auth('student'),
  validateMiddleware(AuthValidation.changePasswordValidation),
  authController.changePassword,
);
export const authRoutes = router;
