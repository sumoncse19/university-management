import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  // const isDepartmentExist = await AcademicDepartmentModel.findOne({
  //   name: payload.name,
  // })

  // if (isDepartmentExist) throw new Error('This department is already exists!')

  const result = await AcademicDepartmentModel.create(payload)
  return result
}

const getAllAcademicDepartmentsFromDB = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty')
  return result
}

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id }).populate(
    'academicFaculty',
  )
  return result
}

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
}
