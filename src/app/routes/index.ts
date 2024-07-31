import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route'

const router = Router()

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)
// or we can use like this:
const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/students',
    router: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    router: AcademicDepartmentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.router))

export default router
