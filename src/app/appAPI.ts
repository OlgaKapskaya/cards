import { instance } from '../common/constants/instance'
import { UserType } from '../features/profile/profileSlice'

export const appAPI = {
  me() {
    return instance.post<UserType>('auth/me')
  },
}
