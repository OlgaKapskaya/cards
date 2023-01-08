import axios from 'axios'

import { UserInfoType } from './profileSlice'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export type ProfileResponseType = {
  updateUser: UserInfoType
  token: string
  tokenDeathTime: number
}

export const profileAPI = {
  changeUserData(token: string, name: string, avatar?: string) {
    return instance.put<ProfileResponseType>('/auth/me', { token, name, avatar })
  },
}
