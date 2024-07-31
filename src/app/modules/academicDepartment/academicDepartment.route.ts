import express from 'express'
import { academicDepartmentControllers } from './academicDepartment.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
)
router.get('/', academicDepartmentControllers.getAllAcademicDepartments)
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
)
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
