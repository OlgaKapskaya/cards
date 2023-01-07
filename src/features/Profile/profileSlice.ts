import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { profileAPI } from './profileAPI'

interface UserInfoType {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean

  error?: string
}

interface ProfileStateType {
  profile: UserInfoType
}

export const changeUserNameTC = createAsyncThunk('profile/changeUserName', async (name: string) => {
  try {
    const response = await profileAPI.changeUserName(name)

    console.log(response)
  } catch (e) {
    console.log(e)
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {} as ProfileStateType,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(changeUserNameTC.fulfilled, (state, action) => {
      // state.profile = action.payload
    })
  },
})
