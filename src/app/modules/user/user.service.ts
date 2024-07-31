import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { StudentModel } from '../student/student.model'
import { TNewUser, TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'

const createUserIntoDB = async (userData: TNewUser) => {
  // create a new static method with data provided by user
  // if (await UserModel.isUserExists(userData.id)) {
  //   throw new Error('User already exists!')
  // }

  const user: Partial<TUser> = {}

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    userData.userInfo.admissionSemester,
  )

  if (admissionSemester) {
    user.id = await generateStudentId(admissionSemester)
  }

  // user.id = '2030010002'

  // using default pass:
  user.password = userData.password || (config.default_pass as string)

  user.needsPasswordChange = userData.password ? false : true

  // if we have to set role:
  user.role = userData.role

  const newUser = await UserModel.create(user) // built in static method

  // now create specific user depends on role in specific user modal:
  if (Object.keys(newUser).length) {
    userData.userInfo.id = newUser.id
    userData.userInfo.user = newUser._id // reference id with user modal

    if (userData.role === 'student') {
      const newUserInfo = await StudentModel.create(userData.userInfo)
      return newUserInfo
    } else {
      throw new AppError(405, `${userData.role} modal is not created now 😢`)
    }
  }

  // create a new instance with data provided by user
  // const student = new StudentModel(studentData) // instance creating

  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error('Student already exists!')
  // }

  // const result = await student.save() // built in instance method

  return newUser // --> eta cole jabe controller ee.
}

export const UserServices = {
  createUserIntoDB,
}
