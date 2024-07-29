import { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  const statusCode = 500
  let message
  if (err instanceof Error) {
    message = err.message
  } else {
    message = 'Something went wrong!'
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
