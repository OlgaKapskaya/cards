import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { AppDispatch, AppRootStateType } from '../../app/store'

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

export const changeUserData = createAsyncThunk<
  UserInfoType,
  string,
  {
    dispatch: AppDispatch
    state: AppRootStateType
  }
>('profile/changeUserName', async (name: string, { dispatch, getState }) => {
  const token = getState().profile.profile.token

  dispatch(setAppStatus('loading'))
  try {
    const response = await profileAPI.changeUserData(token, name)

    dispatch(setAppStatus('succeeded'))

    return response.data.updateUser
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setAppError(e.message))
    }
    if (e instanceof AxiosError) {
      dispatch(setAppError(e.response?.data.error))
    }
    dispatch(setAppStatus('failed'))

    return {} as UserInfoType
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
  } as ProfileStateType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changeUserData.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  },
})
