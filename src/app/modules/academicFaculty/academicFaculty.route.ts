import express from 'express'
import { academicFacultyControllers } from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty,
)
router.get('/', academicFacultyControllers.getAllAcademicFaculties)
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty)
router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyControllers.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
