import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/appSlice'

import { ChangeUserDataPayload, profileAPI } from './profileAPI'

export type UserType = {
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

type ProfileStateType = {
  profile: UserType
}

export const changeUserDataTC = createAsyncThunk(
  'profile/changeUserName',
  async (data: ChangeUserDataPayload, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const response = await profileAPI.changeUserData(data)

      dispatch(setUserData(response.data.data.updateUser))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError(error))
      } else {
        dispatch(setAppError(`native error ${err.message}`))
      }
      dispatch(setAppStatus('failed'))
    }
  }
)

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
  } as ProfileStateType,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.profile = action.payload
    },
  },
})
export const { setUserData } = profileSlice.actions
export const profileReducer = profileSlice.reducer
