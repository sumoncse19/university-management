import { StudentType } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (student: StudentType) => {
  const result = await StudentModel.create(student)

  return result // --> eta cole jabe controller ee.
}

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find({})

  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })

  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
}
