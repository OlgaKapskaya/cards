import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setUserData, UserType } from '../profile/profileSlice'

import {
  authAPI,
  ForgotPassPayloadType,
  LoginRequestType,
  NewPasswordRequestType,
  SignUpPayloadType,
} from './authAPI'

import { setAppMessage, setAppStatus } from 'app/appSlice'
import { errorNetworkUtil } from 'common'

const initialState = {
  isLoggedIn: false,
  isRegistered: false,
  isSentRecoveryEmail: false,
  isRecoveredPassword: false,
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
  async (payload: SignUpPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))

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
  async (payload: ForgotPassPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await authAPI.forgotPass(payload)

      dispatch(isSentRecoveryEmailStatus(true))
      dispatch(setAppMessage('Recovery link sent to email'))
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    signUpStatusCreator(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload
    },
    isSentRecoveryEmailStatus(state, action: PayloadAction<boolean>) {
      state.isSentRecoveryEmail = action.payload
    },
    recoveredPasswordStatus(state, action: PayloadAction<boolean>) {
      state.isRecoveredPassword = action.payload
    },
  },
})

export const {
  setLoggedIn,
  signUpStatusCreator,
  isSentRecoveryEmailStatus,
  recoveredPasswordStatus,
} = authSlice.actions
export const authReducer = authSlice.reducer
