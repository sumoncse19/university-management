import { Schema, model } from 'mongoose'
import validator from 'validator'
// import bcrypt from 'bcrypt'

import {
  TGuardian,
  IGuardianDetails,
  IUserName,
  TLocalGuardian,
  TStudent,
  // TStudentModel,
  // TStudentMethods,
  IStudentModel,
} from './student.interface'
// import config from '../../config'

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
    // custom validator
    // validate: function (value: string) {
    //   const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //   // if (value !== firstNameStr) {
    //   //   return false
    //   // }
    //   // return true
    //   return firstNameStr === value
    // },
    validate: {
      validator: (value: string) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return firstNameStr === value
      },
      message: '{VALUE} is not in capitalize formate',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not in valid',
    },
  },
})

// Define the guardianDetailsSchema
const guardianDetailsSchema = new Schema<IGuardianDetails>({
  name: { type: userNameSchema, required: [true, 'Name is required'] },
  occupation: { type: String, required: [true, 'Occupation is required'] },
  contactNo: { type: String, required: [true, 'Contact Number is required'] },
})

// Define the guardianSchema
const guardianSchema = new Schema<TGuardian>({
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
const localGuardianSchema = new Schema<TLocalGuardian>({
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
// const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({ --> For creating with instance

const studentSchema = new Schema<TStudent, IStudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    profileImg: { type: String },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not valid',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of Birth is required, but you entered: {VALUE}'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    // password: {
    //   type: String,
    //   required: [true, 'Password ID is required'],
    //   maxlength: [25, 'Password can not be more than 20'],
    // },
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
    admissionSemester: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Semester ID is required'],
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department ID is required'],
      ref: 'AcademicDepartment',
    },
    // isActive: {
    //   type: String,
    //   enum: {
    //     values: ['active', 'blocked'],
    //     message: '{VALUE} is not valid',
    //   },
    //   default: 'active',
    // },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

// Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// Middleware --> pre save middleware / hook: will work on create() save() --> To change a value or property of data and save it to db or return it to response.
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook: we will save data')

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const student = this

//   // Hashing password and save into DB
//   student.password = await bcrypt.hash(
//     student.password,
//     Number(config.bcrypt_salt_rounds),
//   )

//   next()
// })

// // Middleware --> post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//   doc.password = ''
//   console.log(this, 'post hook: Student saved successfully')

//   next()
// })

// Query Middleware --> We have to make this for find, findOne and aggregate, to hide a data against true false or boolean, like isDeleted: true.
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }) // isDeleted jodi true na hoy tahole segula amra pathabo.

  next()
})
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } }) // isDeleted jodi true na hoy tahole segula amra pathabo.

  next()
})

// [ { $match: { isDeleted: { $ne: true } } }, { '$match': { id: 'S12346' } } ]
studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline()) // this.pipeline() akta array --> [ { '$match': { id: 'S12346' } } ], ei array er prothome { $match: { isDeleted: { $ne: true } } } insert korte hobe unshift er maddhome taile aggregation use korle oo isDeleted: true property gula show korbe na.
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

  next()
})

// 3. Create a Model.
// const User = model<IUser>('User', userSchema);
// run().catch(err => console.log(err));

// creating a custom static method
studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await StudentModel.findOne({ id })

  return existingStudent
}

// create a custom instance method
// studentSchema.methods.isStudentExists = async function (id: string) {
//   // const existingStudent = await StudentModel.findOne({ id: id })
//   const existingStudent = await StudentModel.findOne({ id })

//   return existingStudent
// }

export const StudentModel = model<TStudent, IStudentModel>(
  'Student',
  studentSchema,
)
