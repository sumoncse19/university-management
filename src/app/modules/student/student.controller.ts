import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../utils/catchAsync'
// import studentValidationSchema from './student.validation'
// import studentValidationSchema from './student.validation'

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // your code here
//     // const student = req.body.Student
//     const { student: studentData } = req.body

//     // now check data validation using Joi
//     // const { error, value } = studentValidationSchema.validate(studentData)

//     // now check data validation using Zod
//     const zodParsedData = studentValidationSchema.parse(studentData)

//     // will call service func to send this data
//     const result = await StudentServices.createStudentIntoDB(zodParsedData)

//     // This error from Joi
//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something went wrong!',
//     //     error: error.details,
//     //   })
//     // }

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student created successfully!',
//       data: result,
//     })
//   } catch (err: unknown) {
//     // Handle error appropriately
//     if (err instanceof Error) {
//       res.status(500).json({
//         success: false,
//         message: err.message,
//         data: err,
//       })
//     } else {
//       res.status(500).json({
//         success: false,
//         message: 'Something went wrong!',
//         data: err,
//       })
//     }
//   }
// }

// For every controller we create asynchronous function with try and catch which is repeat code for better improvement we can create a higher order function.
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully!',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req, res) => {
  // const studentId = req.params.studentId;
  const { studentId } = req.params

  const result = await StudentServices.getSingleStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully!',
    data: result,
  })
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  // const studentId = req.params.studentId;
  const { studentId } = req.params

  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully!',
    data: result,
  })
})

export const studentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
