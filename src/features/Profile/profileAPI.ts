import { instance } from '../../common/constants/instance'

import { UserType } from './profileSlice'

export type ProfileResponseType = {
  updateUser: UserType
  token: string
  tokenDeathTime: number
}
export type ChangeUserDataPayload = {
  name?: string
  avatar?: string
}

export const profileAPI = {
  changeUserData(payload: ChangeUserDataPayload) {
    return instance.put<ProfileResponseType>('/auth/me', payload)
  },
}
