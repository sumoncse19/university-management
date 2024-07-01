// create a schema validation using joi

import Joi from 'joi'

// Define the Joi schema for IUserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-zA-Z]*$/, 'capitalize formate')
    .required()
    .messages({
      'string.empty': 'First Name is required',
      'string.max': 'First Name can not be more than 20 characters',
      'string.pattern.name': '{#value} is not in capitalize formate',
    }),
  middleName: Joi.string().allow('').optional(),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/, 'alphabet')
    .required()
    .messages({
      'string.empty': 'Last Name is required',
      'string.pattern.name': '{#value} is not valid',
    }),
})

// Define the Joi schema for IGuardianDetails
const guardianDetailsValidationSchema = Joi.object({
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
})

// Define the Joi schema for GuardianType
const guardianValidationSchema = Joi.object({
  fatherDetails: guardianDetailsValidationSchema.required().messages({
    'any.required': 'Father details are required',
  }),
  motherDetails: guardianDetailsValidationSchema.required().messages({
    'any.required': 'Mother details are required',
  }),
})

// Define the Joi schema for LocalGuardianType
const localGuardianValidationSchema = Joi.object({
  name: userNameValidationSchema.required().messages({
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local Guardian Address is required',
  }),
})

// Define the Joi schema for StudentType
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student Name is required',
  }),
  profileImg: Joi.string().allow('').optional(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '{#value} is not valid',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of Birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'unknown')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian details are required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian details are required',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not valid',
  }),
})

export default studentValidationSchema
