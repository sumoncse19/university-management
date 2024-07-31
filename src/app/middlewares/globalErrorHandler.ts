import { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
  statusCode?: number
}

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'Something went wrong!'

  if (err instanceof Error) {
    const customError = err as CustomError
    statusCode = customError.statusCode || 500
    message = customError.message
  }

  return res.status(statusCode).json({
    success: false,
    message,
    data: err,
  })

  // if (err instanceof Error) {
  //   res.status(500).json({
  //     success: false,
  //     message: err.message,
  //     data: err,
  //   })
  // } else {
  //   res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong!',
  //     data: err,
  //   })
  // }
}

export default globalErrorHandler
