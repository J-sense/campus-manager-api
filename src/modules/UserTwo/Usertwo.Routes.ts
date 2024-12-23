import express from 'express';
import { userTwoController } from './Usertwo.controller';
const router = express.Router();
router.post('/create-studentTwo', userTwoController.createStudentTwo);
export const userTwoRoutes = router;
