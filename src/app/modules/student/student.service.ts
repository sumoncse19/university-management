// import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

// const createStudentIntoDB = async (studentData: TStudent) => {
//   // create a new static method with data provided by user
//   if (await StudentModel.isStudentExists(studentData.id)) {
//     throw new Error('Student already exists!')
//   }
//   const result = await StudentModel.create(studentData) // built in static method

//   // create a new instance with data provided by user
//   // const student = new StudentModel(studentData) // instance creating

//   // if (await student.isStudentExists(studentData.id)) {
//   //   throw new Error('Student already exists!')
//   // }

//   // const result = await student.save() // built in instance method

//   return result // --> eta cole jabe controller ee.
// }

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find({})
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.aggregate([{ $match: { id: id } }])
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }) // we can findOut a data through aggregate

  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })

  return result
}

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
