import React, { useEffect } from 'react'

import { LinearProgress } from '@mui/material'

import { Loader } from '../common/components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'

import { me, RequestStatusType } from './appSlice'
import { ErrorSnackbar } from './ErrorSnackbar/ErrorSnackbar'
import { Header } from './Header/Header'
import { Pages } from './Pages/Pages'

const App = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <div className="App">
      <Header />
      {status === 'loading' && <LinearProgress />}
      <Pages />
      {status === 'failed' && <ErrorSnackbar />}
    </div>
  )
}

export default App
