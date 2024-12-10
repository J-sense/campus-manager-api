/* eslint-disable no-unused-vars */
import { QueryBuilder } from '../../Builder/QueryBuilder';
import { courseSearchableFields } from './course.constrant';
import { TCourse, TCoursefaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingCourseData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletePreRequisite = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);
    const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletePreRequisite } } },
    });
    const newPreRequisit = preRequisiteCourses.filter(
      (er) => er.course && !er.isDeleted,
    );
    const newPreRequisitCourse = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisit } },
    });
  }
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
export const courseService = {
  createCourseIntoDb,
  getAllFromDb,
  getSingleFromDb,
  deleteCourseFromDb,
  updatedcoursIntoDb,
  assignFacultiesWithCourseIntoDB,
};
