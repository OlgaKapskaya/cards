import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { appMessageSelector, appStatusSelector } from '../../common/selectors/appSelectors'
import { setAppMessage } from '../appSlice'

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
    <Snackbar open={message !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
}
