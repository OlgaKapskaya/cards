import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { setUserData, UserType } from '../Profile/profileSlice'

import {
  authAPI,
  forgotPassPayloadType,
  LoginRequestType,
  NewPasswordRequestType,
  signUpPayloadType,
} from './authAPI'

interface AuthStateType {
  isLoggedIn: boolean
  isRegistered: boolean
}

export const login = createAsyncThunk(
  'auth/login',
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

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
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

export const signUp = createAsyncThunk(
  'reg/signUp',
  async (payload: signUpPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))

    if (payload.password !== payload.pass2) dispatch(setAppError('Passwords dont match'))
    try {
      await authAPI.signUp(payload)
      dispatch(signUpStatusCreator(true))
      dispatch(setAppStatus('idle'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const createNewPassword = createAsyncThunk(
  'auth/createNewPassword',
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

export const forgotPass = createAsyncThunk(
  'auth/forgotPass',
  async (payload: forgotPassPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await authAPI.forgotPass(payload)
      dispatch(setAppStatus('idle'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, isRegistered: false } as AuthStateType,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    signUpStatusCreator(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload
    },
  },
})

export const { setLoggedIn, signUpStatusCreator } = authSlice.actions
