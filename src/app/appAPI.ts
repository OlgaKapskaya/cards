import { instance } from '../common/constants/instance'

export type MeResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
}

export const appAPI = {
  me() {
    return instance.post<MeResponseType>('auth/me', {})
  },
}
