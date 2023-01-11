import { instance, instanceHeroku } from '../../common/constants/instance'
import { UserType } from '../profile/profileSlice'

export type LoginRequestType = {
  email: string
  password: string
  rememberMe: false
}
export type sigUpResponseType = {
  addedUser: {}
  error?: string
}

export type signUpPayloadType = {
  email: string
  password: string
  pass2?: string
}

export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
export type forgotPassResponseType = {
  info: string
  error?: string
}

export type forgotPassPayloadType = {
  email: string
  from: string
  message: string
}

export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<UserType>('auth/login', data)
  },
  logout() {
    return instance.delete('auth/me', {})
  },
  signUp(payload: signUpPayloadType) {
    return instance.post<sigUpResponseType>('auth/register', payload)
  },
  createNewPassword(data: NewPasswordRequestType) {
    return instanceHeroku.post<{ info: string }>('auth/set-new-password', data)
  },
  forgotPass(payload: forgotPassPayloadType) {
    return instanceHeroku.post<forgotPassResponseType>('auth/forgot', payload)
  },
}
