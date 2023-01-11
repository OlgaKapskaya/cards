import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../app/appSlice'
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
  isRecoveredPassword: boolean
}

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const response = await authAPI.login(data)

      dispatch(setAppMessage('Welcome'))
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

    dispatch(setAppMessage('Come back again'))
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

    if (payload.password !== payload.pass2) dispatch(setAppMessage('Passwords dont match'))
    try {
      await authAPI.signUp(payload)
      dispatch(setAppMessage('You are successfully registered'))
      dispatch(signUpStatusCreator(true))
      dispatch(setAppStatus('succeeded'))
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
      await authAPI.createNewPassword(data)

      dispatch(setAppMessage('New password created'))
      dispatch(recoveredPasswordStatus(true))
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

      dispatch(setAppMessage('Recovery link sent to email'))
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isRegistered: false,
    isRecoveredPassword: false,
  } as AuthStateType,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    signUpStatusCreator(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload
    },
    recoveredPasswordStatus(state, action: PayloadAction<boolean>) {
      state.isRecoveredPassword = action.payload
    },
  },
})

export const { setLoggedIn, signUpStatusCreator, recoveredPasswordStatus } = authSlice.actions
