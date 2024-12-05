import { model, Schema } from 'mongoose';
import { TacademicDepartment } from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
  },
  {
    timestamps: true,
  },
);
export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
