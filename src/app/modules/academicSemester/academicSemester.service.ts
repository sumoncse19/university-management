import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check relation between semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemesterModel.create(payload)

  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find({})

  return result
}

const getSingleAcademicSemesterFromDB = async (_id: string) => {
  console.log(_id, 'check id')
  const result = await AcademicSemesterModel.findOne({ _id })
  // const result2 = await AcademicSemesterModel.aggregate([
  //   { $match: { _id: _id } },
  // ])

  console.log(result, 'result2')

  return result
}

const updateAcademicSemesterIntoDB = async (
  _id: string,
  payload: TAcademicSemester,
) => {
  // check relation between semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  } else {
    const isSemesterExist = await AcademicSemesterModel.findOne({
      year: payload.year,
      name: payload.name,
    })

    if (isSemesterExist) {
      throw new Error('Semester is already exist!')
    }
  }

  const result = await AcademicSemesterModel.findByIdAndUpdate(_id, payload, {
    new: true,
  })

  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
