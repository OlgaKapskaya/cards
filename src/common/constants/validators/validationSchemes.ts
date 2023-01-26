import * as yup from 'yup'
//constants
const MIN_LENGTH_PASSWORD = 8
const MAX_LENGTH_PASSWORD = 12

const passwordValidation = yup.string().required().min(MIN_LENGTH_PASSWORD).max(MAX_LENGTH_PASSWORD)
const emailValidation = yup.string().email().required()
const basicTextFieldValidation = yup.string().required()

//schemes
export const newPasswordValidationScheme = yup.object({
  password: passwordValidation,
})

export const registrationValidationSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: passwordValidation.oneOf([yup.ref('password')], 'passwords do not match'),
})

export const loginValidationSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
})

export const forgotValidationSchema = yup.object({
  email: emailValidation,
})

export const createCardSchema = yup.object({
  question: basicTextFieldValidation,
  answer: basicTextFieldValidation,
})

export const updatePackSchema = yup.object({
  name: basicTextFieldValidation,
})

export const addPackSchema = yup.object({
  name: basicTextFieldValidation,
})
