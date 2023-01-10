import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppMessage, setAppStatus } from '../../app/appSlice'

export const errorNetworkUtil = (dispatch: Dispatch, e: any) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppMessage(error))
  } else {
    dispatch(setAppMessage(`native error ${err.message}`))
  }

  dispatch(setAppStatus('failed'))
}
