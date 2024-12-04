import { model, Schema } from 'mongoose';

const AcademicFacultySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
export const AcademicFaculty = model('AcademicFaculty', AcademicFacultySchema);
