import React, { useEffect } from 'react'

import { CircularProgress, LinearProgress } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'

import { me, RequestStatusType } from './appSlice'
import { NavBar } from './NavBar/NavBar'
import { Pages } from './Pages/Pages'

const App = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(me())
  }, [dispatch])
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <NavBar />
      {status === 'loading' && <LinearProgress />}
      <Pages />
    </div>
  )
}

export default App
