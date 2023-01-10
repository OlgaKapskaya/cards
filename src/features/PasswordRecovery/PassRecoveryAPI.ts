import axios from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export type forgotPassResponseType = {
  info: string
  error?: string
}

export type forgotPassPayloadType = {
  email: string
  from: string
  message: string
}

export const passRecoveryAPI = {
  forgotPass(payload: forgotPassPayloadType) {
    return instance.post<forgotPassResponseType>('auth/forgot', payload)
  },
}
