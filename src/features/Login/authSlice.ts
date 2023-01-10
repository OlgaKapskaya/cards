import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { setUserData, UserType } from '../Profile/profileSlice'

import { authAPI, LoginRequestType, NewPasswordRequestType } from './authAPI'

interface LoginStateType {
  isLoggedIn: boolean
}

export const login = createAsyncThunk(
  'login/login',
  async (data: LoginRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const response = await authAPI.login(data)

      dispatch(setLoggedIn(true))
      dispatch(setUserData(response.data))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const logout = createAsyncThunk('login/logout', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    await authAPI.logout()

    dispatch(setLoggedIn(false))
    dispatch(setUserData({} as UserType))
    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    errorNetworkUtil(dispatch, e)
  }
})

export const createNewPassword = createAsyncThunk(
  'login/createNewPassword',
  async (data: NewPasswordRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const response = await authAPI.createNewPassword(data)

      console.log(response)
      dispatch(setLoggedIn(true))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const authSlice = createSlice({
  name: 'login',
  initialState: { isLoggedIn: false } as LoginStateType,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { setLoggedIn } = authSlice.actions
