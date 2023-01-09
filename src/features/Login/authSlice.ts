import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { setUserData } from '../Profile/profileSlice'

import { authAPI, LoginRequestType } from './authAPI'

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
