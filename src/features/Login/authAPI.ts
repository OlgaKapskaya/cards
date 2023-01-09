import { instance } from '../../common/constants/instance'
import { UserType } from '../Profile/profileSlice'

export type LoginRequestType = {
  email: string
  password: string
  rememberMe: false
}

export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<UserType>('auth/login', data)
  },
}
