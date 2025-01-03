import { model, Schema } from 'mongoose';
import { acadeicSemester } from './academic.interface';

const academicSchema = new Schema<acadeicSemester>({
  name: {
    type: String,
    enum: ['Autumn', 'Summer', 'Fall'],
    required: true,
  },
  code: {
    type: String,
    enum: ['01', '02', '03'],
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startmonth: {
    type: String,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  endMonth: {
    type: String,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
});

academicSchema.pre('save', async function (next) {
  const isExistSemester = await academicModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExistSemester) {
    throw new Error('Semester is already exists');
  }
  next();
});

export const academicModel = model<acadeicSemester>(
  'AcademicSemester',
  academicSchema,
);
