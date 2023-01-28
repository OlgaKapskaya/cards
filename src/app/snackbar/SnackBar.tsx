import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppMessage } from '../appSlice'

import { useAppDispatch, useAppSelector, appMessageSelector, appStatusSelector } from 'common'

export const SnackBar = () => {
  const message = useAppSelector(appMessageSelector)
  const status = useAppSelector(appStatusSelector)

  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppMessage(null))
  }

  const alertSeverity = status === 'failed' ? 'error' : 'success'

  return (
    <Snackbar open={message !== null} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}
