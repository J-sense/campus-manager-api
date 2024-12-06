import config from '../../config';
import { academicModel } from '../academic-semester/academic.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

// const createStudentIntoDB = async (password: string, studentData: TStudent) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'student';
//   // find academic semester info
//   const admissionSemester = await academicModel.findById(
//     studentData.admissionSemester,
//   );
//   if (!admissionSemester) {
//     throw new Error('not found');
//   }
//   //set manually generated it
//   userData.id = await generatedId(admissionSemester);

//   // create a user
//   const newUser = await User.create(userData);

//   //create a student
//   if (Object.keys(newUser).length) {
//     // set id , _id as user
//     studentData.id = newUser.id;
//     studentData.user = newUser._id; //reference _id

//     const newStudent = await StudentModel.create(studentData);
//     return newStudent;
//   }
// };

// export const UserServices = {
//   createStudentIntoDB,
// };

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  try {
    // Create a user object
    const userData: Partial<TUser> = {};

    // Set password
    userData.password = password || (config.default_password as string);

    // Set student role
    userData.role = 'student';

    // Find academic semester info
    const admissionSemester = await academicModel.findById(
      studentData.admissionSemester,
    );
    if (!admissionSemester) {
      throw new Error('Academic semester not found');
    }

    // Generate user ID
    userData.id = await generateStudentId(admissionSemester);

    // Create a new user
    const newUser = await User.create(userData);

    // Create a new student
    if (Object.keys(newUser).length) {
      studentData.id = newUser.id;
      studentData.user = newUser._id; // Set reference to user's _id

      const newStudent = await StudentModel.create(studentData);
      return newStudent;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    // Log and rethrow the error for further handling
    console.error('Error creating student:', error);
    throw error;
  }
};
export const UserServices = {
  createStudentIntoDB,
};
