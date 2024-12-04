import { z } from 'zod';

const AcademicFacultyVAlidation = z.object({
  body: z.object({
    name: z.string(),
  }),
});
export default AcademicFacultyVAlidation;
