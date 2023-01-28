import { instance } from 'common'
import { UserType } from 'features/profile/profileSlice'

export const appAPI = {
  me() {
    return instance.post<UserType>('auth/me')
  },
}
