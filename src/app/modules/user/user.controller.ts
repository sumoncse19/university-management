import {} from // NextFunction,
//  Request,
// RequestHandler,
// Response
'express'
import { UserServices } from './user.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../../utils/catchAsync'
// import { UserValidation } from './user.validation'

// type AddFunc = (param1: number, param2: number) => number

// const add: AddFunc = (a, b) => a + b

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
const createUser = catchAsync(async (req, res) => {
  // your code here
  // const student = req.body.Student
  // const { userInfo: userData } = req.body

  // now check data validation using Joi
  // const { error, value } = studentValidationSchema.validate(studentData)

  // now check data validation using Zod
  // const zodParsedData = UserValidation.userValidationSchema.parse(password)

  // will call service func to send this data
  const result = await UserServices.createUserIntoDB(req.body)

  // This error from Joi
  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong!',
  //     error: error.details,
  //   })
  // }

  // send response
  // res.status(200).json({
  //   success: true,
  //   message: 'Student created successfully!',
  //   data: result,
  // })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

export const userControllers = {
  createUser,
}
