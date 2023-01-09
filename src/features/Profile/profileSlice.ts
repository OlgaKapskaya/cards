import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

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
      errorNetworkUtil(dispatch, e)
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
