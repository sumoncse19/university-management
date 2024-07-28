import { z } from 'zod'

const userValidationSchema = z.object({
  role: z.enum(['admin', 'faculty', 'student']),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
})

export const UserValidation = {
  userValidationSchema,
}
