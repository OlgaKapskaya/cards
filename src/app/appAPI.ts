import { instance } from '../common/constants/instance'
import { UserType } from '../features/Profile/profileSlice'

export const appAPI = {
  me() {
    return instance.post<UserType>('auth/me', {})
  },
}
