import httpStatus from 'http-status'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully!',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters are retrieved successfully!',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
      academicSemesterId,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrieved successfully!',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params
  const academicSemesterData = req.body

  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    academicSemesterId,
    academicSemesterData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is updated successfully!',
    data: result,
  })
})

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
