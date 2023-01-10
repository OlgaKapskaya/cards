import { instance } from '../../common/constants/instance'
import { UserType } from '../Profile/profileSlice'

export type LoginRequestType = {
  email: string
  password: string
  rememberMe: false
}
export type NewPasswordRequestType = {
  password: string
  resetPasswordToken: string
}

export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<UserType>('auth/login', data)
  },
  logout() {
    return instance.delete('auth/me', {})
  },
  createNewPassword(data: NewPasswordRequestType) {
    return instance.post('auth/set-new-password', data)
  },
}
