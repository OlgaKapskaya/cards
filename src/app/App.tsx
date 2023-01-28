import React, { useEffect } from 'react'

import LinearProgress from '@mui/material/LinearProgress'
import { useSearchParams } from 'react-router-dom'

import s from './App.module.css'
import { me } from './appSlice'
import { Header } from './header/Header'
import { Pages } from './pages/Pages'
import { SnackBar } from './snackbar/SnackBar'

import {
  Loader,
  useAppDispatch,
  useAppSelector,
  appIsInitializedSelector,
  appStatusSelector,
} from 'common'
import { setSearchParams } from 'features/packs/packsSlice'

const App = () => {
  const status = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(appIsInitializedSelector)
  const dispatch = useAppDispatch()
  const isOpenSnackBar = status === 'failed' || status === 'succeeded'

  const [searchParams] = useSearchParams()

  useEffect(() => {
    dispatch(me())
    // проверяем параметры из url
    // чтобы были для packs
    Object.fromEntries(searchParams).page && dispatch(setSearchParams(searchParams))
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
