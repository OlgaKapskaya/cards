import React from 'react'

import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { RequestStatusType, setAppMessage } from '../appSlice'

export const SnackBar = () => {
  const message = useAppSelector<string | null>(state => state.app.message)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppMessage(null))
  }

  const alertSeverity = status === 'failed' ? 'error' : 'success'

  return (
    <Snackbar open={message !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}
