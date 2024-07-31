import AppError from '../../errors/AppError'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { model, Schema } from 'mongoose'
const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
})

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  })

  if (isSemesterExist) {
    throw new AppError(409, 'Semester is already exist!')
  }
  next()
})

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
