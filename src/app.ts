import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Your server is running and hit the / route!',
  })
}

app.get('/', getAController)

// Global error handling
app.use(globalErrorHandler)

// Not found route
app.use(notFound)

export default app
