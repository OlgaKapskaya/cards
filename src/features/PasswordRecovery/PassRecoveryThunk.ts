import { createAsyncThunk } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import { forgotPassPayloadType, passRecoveryAPI } from './PassRecoveryAPI'

export const forgotPass = createAsyncThunk(
  'login/forgotPass',
  async (payload: forgotPassPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await passRecoveryAPI.forgotPass(payload)
      dispatch(setAppStatus('idle'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)
