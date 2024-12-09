import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllFromDb = async () => {
  const result = await Course.find();
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
};
export const courseService = {
  createCourseIntoDb,
  getAllFromDb,
  getSingleFromDb,
  deleteCourseFromDb,
};
