import { Types } from 'mongoose';

export type TUserNameTwo = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardianTwo = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardianTwo = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudentTwo = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserNameTwo;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardianTwo;
  localGuardian: TLocalGuardianTwo;
  profileImg?: string;
  isDeleted: boolean;
};
