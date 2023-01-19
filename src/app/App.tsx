import React, { useEffect } from 'react'

import LinearProgress from '@mui/material/LinearProgress'
import { useSearchParams } from 'react-router-dom'

import { Loader } from '../common/components/loader/Loader'
import { useAppDispatch, useAppSelector } from '../common/hooks/reactReduxHooks'
import { appIsInitializedSelector, appStatusSelector } from '../common/selectors/appSelectors'
import { searchParamsSelector } from '../common/selectors/packsListSelectors'
import { setCurrentPage, setPackName, setPageCount, setSort } from '../features/packs/packsSlice'

import s from './App.module.css'
import { me } from './appSlice'
import { Header } from './header/Header'
import { Pages } from './pages/Pages'
import { SnackBar } from './snackbar/SnackBar'

const App = () => {
  const status = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(appIsInitializedSelector)
  const dispatch = useAppDispatch()
  const isOpenSnackBar = status === 'failed' || status === 'succeeded'

  const [searchParams] = useSearchParams()
  const stateSearchParams = useAppSelector(searchParamsSelector)

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    if (JSON.stringify(params) !== JSON.stringify(stateSearchParams)) {
      dispatch(setCurrentPage(+params.page || 1))
      dispatch(setPageCount(+params.pageCount || 4))
      dispatch(setPackName(params.packName || ''))
      dispatch(setSort(params.sortPacks))
    }
  }, [])

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
