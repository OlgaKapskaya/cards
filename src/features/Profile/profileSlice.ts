import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setAppError } from '../../app/appSlice'

import { profileAPI } from './profileAPI'

export interface UserInfoType {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string | null
}

interface ProfileStateType {
  profile: UserInfoType
}

export const changeUserNameTC = createAsyncThunk('profile/changeUserName', async (name: string) => {
  try {
    const response = await profileAPI.changeUserData(name)

    return response.data.updateUser
  } catch (error) {
    if (error instanceof AxiosError) {
      setAppError(error.response?.data.error)
    }
    if (error instanceof Error) {
      setAppError(error.message)
    }

    return {} as UserInfoType
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {
      _id: '63b9c692013e5e36210e69fb',
      email: 'olikbuko@gmail.com',
      rememberMe: false,
      isAdmin: false,
      name: 'Olik Kapskaya',
      verified: false,
      publicCardPacksCount: 0,
      created: '2023-01-07T19:22:58.507Z',
      updated: '2023-01-07T19:24:29.206Z',
      __v: 0,
      token: 'e7c31420-8ec0-11ed-9909-7961eeb3c43b',
      tokenDeathTime: 1673130269154,
      avatar: null,
    },
  } as ProfileStateType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changeUserNameTC.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  },
})
