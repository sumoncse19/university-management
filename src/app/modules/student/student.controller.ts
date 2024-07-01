import { Request, Response } from 'express'
import { StudentServices } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    // your code here
    // const student = req.body.Student
    const { student: studentData } = req.body

    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    // send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully!',
      data: result,
    })
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    })
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
  } catch (err) {
    console.log(err)
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
  } catch (err) {
    console.log(err)
  }
}

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
