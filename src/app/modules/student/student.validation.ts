import { z } from 'zod'

// Define the Zod schema for IUserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name can not be more than 20 characters')
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        /^[A-Z][a-zA-Z]*$/.test(value),
      {
        message: '{VALUE} is not in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[a-zA-Z]+$/.test(value), {
    message: '{VALUE} is not valid',
  }),
})

// Define the Zod schema for IGuardianDetails
const guardianDetailsValidationSchema = z.object({
  name: userNameValidationSchema,
  occupation: z.string(),
  contactNo: z.string(),
})

// Define the Zod schema for GuardianType
const guardianValidationSchema = z.object({
  fatherDetails: guardianDetailsValidationSchema,
  motherDetails: guardianDetailsValidationSchema,
})

// Define the Zod schema for LocalGuardianType
const localGuardianValidationSchema = z.object({
  name: userNameValidationSchema,
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

// Define the Zod schema for StudentType
const studentValidationSchema = z.object({
  body: z.object({
    // id: z.string(),
    name: userNameValidationSchema,
    profileImg: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    // password: z.string().max(20),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'unknown'])
      .optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester: z.string(),
    academicDepartment: z.string(),
    // isActive: z.enum(['active', 'blocked']).default('active'),
    // isDeleted: z.boolean(),
  }),
})

export const studentValidations = {
  studentValidationSchema,
}
