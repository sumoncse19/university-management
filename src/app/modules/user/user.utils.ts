import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { UserModel } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOneAndDelete(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  // for first time 0000
  let currentId = (0).toString() // default --> 0000

  const lastStudentId = await findLastStudentId() // 2030 01 0001
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4) // 2030
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) // 01
  const currentSemesterYear = payload.year
  const currentSemesterCode = payload.code

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentSemesterYear &&
    lastStudentSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentId.substring(6) // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
