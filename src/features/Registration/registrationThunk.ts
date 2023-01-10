import { createAsyncThunk } from '@reduxjs/toolkit'

import { setAppError, setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import { registrationAPI, signUpPayloadType } from './registrationAPI'
import { signUpStatusCreator } from './registrationSlice'

export const signUp = createAsyncThunk(
  'reg/signUp',
  async (payload: signUpPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))

    if (payload.password !== payload.pass2) dispatch(setAppError('Passwords dont match'))
    try {
      await registrationAPI.signUp(payload)
      dispatch(signUpStatusCreator(true))
      dispatch(setAppStatus('idle'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)
