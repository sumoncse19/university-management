// 1. Create an interface representing a Student in MongoDB.
// interface IStudent {
//   name: string;
//   email: string;
//   profileImg?: string;
// }

// also we can use like this:
// 1. Create an type representing a Student in MongoDB.
export interface IUserName {
  firstName: string
  middleName: string
  lastName: string
}

export interface IGuardianDetails {
  name: IUserName
  occupation: string
  contactNo: string
}

export type GuardianType = {
  fatherDetails: IGuardianDetails
  motherDetails: IGuardianDetails
}

export type LocalGuardianType = IGuardianDetails & {
  address: string
}

export type StudentType = {
  id: string
  name: IUserName
  profileImg?: string
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?:
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'O+'
    | 'O-'
    | 'AB+'
    | 'AB-'
    | 'unknown'
  presentAddress: string
  permanentAddress: string
  guardian: GuardianType
  localGuardian: LocalGuardianType
  isActive: 'active' | 'blocked'
}
