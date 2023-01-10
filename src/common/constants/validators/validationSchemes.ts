import * as yup from 'yup'
//constants
const MIN_LENGTH_PASSWORD = 8
const MAX_LENGTH_PASSWORD = 12
const messages = {
  min: `Password length should be at least ${MIN_LENGTH_PASSWORD} characters`,
  max: `Password cannot exceed more than ${MAX_LENGTH_PASSWORD} characters`,
  required: 'Field is required',
}

//schemes
export const newPasswordValidationScheme = yup.object({
  password: yup
    .string()
    .min(MIN_LENGTH_PASSWORD, messages.min)
    .max(MAX_LENGTH_PASSWORD, messages.max)
    .required(messages.required),
})
