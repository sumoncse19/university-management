import express from 'express'
import { academicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()
router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
)
router.get('/', academicSemesterControllers.getAllAcademicSemester)
router.get(
  '/:academicSemesterId',
  academicSemesterControllers.getSingleAcademicSemester,
)
router.patch(
  '/:academicSemesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
)

export const AcademicSemesterRoutes = router
