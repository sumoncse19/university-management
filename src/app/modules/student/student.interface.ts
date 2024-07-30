// 1. Create an interface representing a Student in MongoDB.
// interface IStudent {
//   name: string;
//   email: string;
//   profileImg?: string;
// }

import { Model, Document, Types } from 'mongoose'

// also we can use like this:
// 1. Create an type representing a Student in MongoDB.
export interface IUserName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface IGuardianDetails {
  name: IUserName
  occupation: string
  contactNo: string
}

export type TGuardian = {
  fatherDetails: IGuardianDetails
  motherDetails: IGuardianDetails
}

export type TLocalGuardian = IGuardianDetails & {
  address: string
}

export interface TStudent extends Document {
  id: string
  user: Types.ObjectId
  name: IUserName
  profileImg?: string
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  email: string
  password: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?:
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'O+'
    | 'O-'
    | 'AB+'
    | 'AB-'
    | 'unknown'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  admissionSemester: Types.ObjectId
  // isActive: 'active' | 'blocked'
  // isDeleted: boolean
}

// For creating static
export interface IStudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isStudentExists(id: string): Promise<TStudent | null>
}

// For creating instance
// export type TStudentMethods = {
//   isStudentExists(id: string): Promise<TStudent | null>
// }

// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >
