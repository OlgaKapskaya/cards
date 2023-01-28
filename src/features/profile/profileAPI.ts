import { UserType } from './profileSlice'

import { instance } from 'common'

export type ProfileResponseType = {
  updatedUser: UserType
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
