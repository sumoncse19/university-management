import { Schema, model } from 'mongoose'
import {
  GuardianType,
  IGuardianDetails,
  IUserName,
  LocalGuardianType,
  StudentType,
} from './student.interface'

// 2. Create a Schema corresponding to the document interface.
// const studentSchema = new Schema<IStudent>({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   profileImg: String
// });

const userNameSchema = new Schema<IUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianDetailsSchema = new Schema<IGuardianDetails>({
  name: userNameSchema,
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
})

const guardianSchema = new Schema<GuardianType>({
  fatherDetails: guardianDetailsSchema,
  motherDetails: guardianDetailsSchema,
})

const localGuardianSchema = new Schema<LocalGuardianType>({
  // ...guardianDetailsSchema,
  name: { type: userNameSchema, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<StudentType>({
  id: { type: String },
  name: userNameSchema,
  profileImg: String,
  gender: { type: String, enum: ['male', 'female'], required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'unknown'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  isActive: ['active', 'blocked'],
})

// 3. Create a Model.
// const User = model<IUser>('User', userSchema);
// run().catch(err => console.log(err));

export const StudentModel = model<StudentType>('Student', studentSchema)
