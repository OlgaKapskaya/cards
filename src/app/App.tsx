import React, { useEffect } from 'react'

import { LinearProgress } from '@mui/material'

import { Loader } from '../common/components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../common/hooks/react-redux-hooks'

import s from './App.module.css'
import { me, RequestStatusType } from './appSlice'
import { Header } from './Header/Header'
import { Pages } from './Pages/Pages'
import { SnackBar } from './SnackBar/SnackBar'

const App = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()
  const isOpenSnackBar = status === 'failed' || status === 'succeeded'

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <div className={s.app}>
      <Header />
      {status === 'loading' && <LinearProgress />}
      <Pages />
      {isOpenSnackBar && <SnackBar />}
    </div>
  )
}

export default App
