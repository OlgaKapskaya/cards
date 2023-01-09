import { AxiosResponse } from 'axios'

import { instance } from '../common/constants/instance'
import { UserType } from '../features/Profile/profileSlice'

export const appAPI = {
  me() {
    return instance.post<AxiosResponse<UserType>>('auth/me', {})
  },
}
