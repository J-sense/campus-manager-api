import { model, Schema } from 'mongoose';
import { TSemesterRagistration } from './semesterRagistration.interface';

const schemaRagistration = new Schema<TSemesterRagistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<TSemesterRagistration>(
  'SemesterRegistration',
  schemaRagistration,
);
