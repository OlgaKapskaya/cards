import { AxiosResponse } from 'axios'

import { instance } from '../common/constants/instance'

export const appAPI = {
  me() {
    return instance.post<AxiosResponse>('auth/me', {})
  },
}
