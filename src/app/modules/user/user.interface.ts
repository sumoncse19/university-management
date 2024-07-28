import { Model } from 'mongoose'
import { TStudent } from '../student/student.interface'

export type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'faculty' | 'student'
  status: 'active' | 'blocked'
  isDeleted: boolean
}

export type TNewUser = TUser & {
  userInfo: TStudent
}

export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUser>
}
