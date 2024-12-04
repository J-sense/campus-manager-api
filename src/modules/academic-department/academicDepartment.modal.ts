import { model, Schema } from 'mongoose';
import { TacademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TacademicDepartment>({
  name: {
    type: String,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
});
export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicFaculty',
  AcademicDepartmentSchema,
);
