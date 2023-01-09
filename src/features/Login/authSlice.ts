import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { setUserData } from '../Profile/profileSlice'

import { authAPI, LoginRequestType } from './authAPI'

interface LoginStateType {
  isLoggedIn: boolean
}

export const login = createAsyncThunk(
  'login/login',
  async (data: LoginRequestType, { dispatch }) => {
    console.log('start thunk')

    dispatch(setAppStatus('loading'))
    try {
      const response = await authAPI.login(data)

      dispatch(setLoggedIn(true))
      dispatch(setUserData(response.data))
      dispatch(setAppStatus('succeeded'))
      console.log('try')
    } catch (e: any) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError(error))
        console.log('catch err1')
      } else {
        dispatch(setAppError(`native error ${err.message}`))
        console.log('catch err2')
      }
      console.log('final')

      dispatch(setAppStatus('failed'))
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
