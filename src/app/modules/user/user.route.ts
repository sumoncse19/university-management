import express from 'express'
import { userControllers } from './user.controller'
// import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.newUserValidationSchema),
  userControllers.createUser,
)

export const UserRoutes = router
