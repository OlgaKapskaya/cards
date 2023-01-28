import { UserType } from '../profile/profileSlice'

import { instance, instanceHeroku } from 'common/constants/instance'

export type LoginRequestType = {
  email: string
  password: string
  rememberMe: false
}
export type SigUpResponseType = {
  addedUser: {}
  error?: string
}

export type SignUpPayloadType = {
  email: string
  password: string
}

export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}
export type ForgotPassResponseType = {
  info: string
  error?: string
}

export type ForgotPassPayloadType = {
  email: string
  from: string
  message: string
}

export const authAPI = {
  login(payload: LoginRequestType) {
    return instance.post<UserType>('auth/login', payload)
  },
  logout() {
    return instance.delete('auth/me')
  },
  signUp(payload: SignUpPayloadType) {
    return instance.post<SigUpResponseType>('auth/register', payload)
  },
  createNewPassword(payload: NewPasswordRequestType) {
    return instanceHeroku.post<{ info: string }>('auth/set-new-password', payload)
  },
  forgotPass(payload: ForgotPassPayloadType) {
    return instanceHeroku.post<ForgotPassResponseType>('auth/forgot', payload)
  },
}
