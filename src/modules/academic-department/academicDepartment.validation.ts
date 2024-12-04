import { z } from 'zod';
export const academicDepartValidation = z.object({
  body: z.object({
    name: z.string(),
    academicFaculty: z.string(),
  }),
});
const upadatedacademicDepartValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});
export const AcademicDepartmentValidation = {
  upadatedacademicDepartValidation,
  academicDepartValidation,
};
