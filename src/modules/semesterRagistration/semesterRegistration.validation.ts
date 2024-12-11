import { z } from 'zod';

const createSemesterRagistrationValidation = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});
const updateSemesterRagistrationValidation = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterRagistrationValidation,
  updateSemesterRagistrationValidation,
};
