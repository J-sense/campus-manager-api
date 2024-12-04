import { model, Schema } from 'mongoose';

const AcademicFacultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
export const AcademicFaculty = model('AcademicFaculty', AcademicFacultySchema);
