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

AcademicDepartmentSchema.pre('save', async function () {
  const isDepartmentExits = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExits) {
    throw new Error('This Department is already exist');
  }
});
export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
