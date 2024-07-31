import { z } from 'zod'
import { studentValidations } from '../student/student.validation'

const userValidationSchema = z.object({
  role: z.enum(['admin', 'faculty', 'student']),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
})

const createUserValidationSchema = z.object({
  body: userValidationSchema.extend({
    userInfo: studentValidations.studentValidationSchema.shape.body,
  }),
})

export const UserValidation = {
  userValidationSchema,
  newUserValidationSchema: createUserValidationSchema,
}
