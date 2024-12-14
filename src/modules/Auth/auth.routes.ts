import express from 'express';
import validateMiddleware from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { authController } from './auth.controller';
const router = express.Router();
router.post(
  '/login',
  validateMiddleware(AuthValidation.loginValidation),
  authController.createLogin,
);
export const authRoutes = router;
