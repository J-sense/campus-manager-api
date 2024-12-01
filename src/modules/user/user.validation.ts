import { z } from 'zod';
const userSchema = z.object({
  password: z
    .string()
    .max(20, { message: 'Password can not be more than 20 charecters' })
    .optional(),
});
export const UserValidation = {
  userSchema,
};
