import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from '../../app/appSlice'

import { registrationAPI, signUpPayloadType } from './registration-api'

export const signUp = createAsyncThunk(
  'reg/signUp',
  async (payload: signUpPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    if (payload.password !== payload.pass2) dispatch(setAppError('Passwords dont match'))
    try {
      const res = await registrationAPI.signUp(payload)

      dispatch(setAppStatus('succeeded'))
      dispatch(setAppStatus('idle'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError(error))
      } else {
        dispatch(setAppError(`Native error ${err.message}`))
      }
    }
  }
)
