import { acadeicSemester } from '../academic-semester/academic.interface';

export const generatedId = async (payload: acadeicSemester) => {
  const currentId = await (0).toString().padStart(4, '0');
  let incrementId = (Number(currentId) + 1).toString();
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
