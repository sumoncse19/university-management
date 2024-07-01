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

// Define the userNameSchema
const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 character'],
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last Name is required'] },
})

// Define the guardianDetailsSchema
const guardianDetailsSchema = new Schema<IGuardianDetails>({
  name: { type: userNameSchema, required: [true, 'Name is required'] },
  occupation: { type: String, required: [true, 'Occupation is required'] },
  contactNo: { type: String, required: [true, 'Contact Number is required'] },
})

// Define the guardianSchema
const guardianSchema = new Schema<GuardianType>({
  fatherDetails: {
    type: guardianDetailsSchema,
    required: [true, 'Father details are required'],
  },
  motherDetails: {
    type: guardianDetailsSchema,
    required: [true, 'Mother details are required'],
  },
})

// Define the localGuardianSchema
const localGuardianSchema = new Schema<LocalGuardianType>({
  // ...guardianDetailsSchema,
  name: {
    type: userNameSchema,
    required: [true, 'Local Guardian Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
})

// Define the studentSchema
const studentSchema = new Schema<StudentType>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  name: { type: userNameSchema, required: [true, 'Student Name is required'] },
  profileImg: { type: String },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String, required: [true, 'Date of Birth is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  contactNo: { type: String, required: [true, 'Contact Number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'unknown'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian details are required'],
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not valid',
    },
    default: 'active',
  },
})

// 3. Create a Model.
// const User = model<IUser>('User', userSchema);
// run().catch(err => console.log(err));

export const StudentModel = model<StudentType>('Student', studentSchema)
