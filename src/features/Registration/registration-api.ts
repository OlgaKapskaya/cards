import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export type sigUpResponseType = {
  addedUser: {}
  error?: string
}

export type signUpPayloadType = {
  email: string
  password: string
  pass2?: string
}

export const registrationAPI = {
  signUp(payload: signUpPayloadType) {
    return instance.post('auth/register', payload)
  },
}
