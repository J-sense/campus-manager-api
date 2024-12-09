import { QueryBuilder } from '../../Builder/QueryBuilder';
import { courseSearchableFields } from './course.constrant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};
const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};
const updatedcoursIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updateBasicCourseInfo;
};
export const courseService = {
  createCourseIntoDb,
  getAllFromDb,
  getSingleFromDb,
  deleteCourseFromDb,
  updatedcoursIntoDb,
};
