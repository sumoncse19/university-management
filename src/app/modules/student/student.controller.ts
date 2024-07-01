import { Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentValidationSchema from './student.validation'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    // your code here
    // const student = req.body.Student
    const { student: studentData } = req.body

    // now check data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData)

    // now check data validation using Zod
    const zodParsedData = studentValidationSchema.parse(studentData)

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData)

    // This error from Joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   })
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
  } catch (err: unknown) {
    // Handle error appropriately
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: err,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        data: err,
      })
    }
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB()

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully!',
      data: result,
    })
  } catch (err: unknown) {
    // Handle error appropriately
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: err,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        data: err,
      })
    }
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully!',
      data: result,
    })
  } catch (err: unknown) {
    // Handle error appropriately
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: err,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        data: err,
      })
    }
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    // const studentId = req.params.studentId;
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully!',
      data: result,
    })
  } catch (err: unknown) {
    // Handle error appropriately
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        data: err,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        data: err,
      })
    }
  }
}

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
