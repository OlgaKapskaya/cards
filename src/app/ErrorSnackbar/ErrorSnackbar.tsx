import { Alert, Snackbar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { setAppError } from '../appSlice'

export const ErrorSnackbar = () => {
  const error = useAppSelector<string | null>(state => state.app.error)

  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
