import express from 'express';
import { userController } from './user.controller';

import validateMiddleware from '../../middleware/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
const router = express.Router();
// const oneManArmy = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
// };

router.post(
  '/create-student',
  validateMiddleware(createStudentValidationSchema),
  userController.createUser,
);
export const userRoutes = router;
