import { acadeicSemester } from '../academic-semester/academic.interface';
import { User } from './user.model';

const findLastOne = async () => {
  const lastone = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
    },
  ).sort({
    createdAt: -1,
  });
  return lastone?.id ? lastone.id.subString(6) : undefined;
};
export const generatedId = async (payload: acadeicSemester) => {
  const currentId = (await findLastOne()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
