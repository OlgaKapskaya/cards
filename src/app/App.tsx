import React, { createContext, useEffect, useMemo, useState } from 'react'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useSearchParams } from 'react-router-dom'

import { ToggleColorMode } from '../common/components/toggle-color-mode/ToggleColorMode'

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

// создаем контекст и присваиваем ему первоначальное значение(функцию переключеиня темы)
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
})

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

  // получаем "последнюю" тему из local storage
  // const colorModeLS = localStorage.getItem("colorMode");
  // const initMode = colorModeLS ? JSON.parse(colorModeLS) : "light";

  // состояние темы
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  // при изменении темы, "запоминаем" состояние в local storage
  // useEffect(() => localStorage.setItem("colorMode", JSON.stringify(mode)), [mode]);

  // создаем объект с функцию изменения темы и мемоизируем его
  // создается всего 1 раз, т.к. нет зависимостей
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  // подменяем стили в MUI на собственные, устанавливаем тему
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        typography: {
          fontFamily: 'Montserrat',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Conv_Montserrat-VariableFont_wght';
          src: url('fonts/Montserrat-VariableFont_wght.eot');
          src: local('☺'), url('fonts/Montserrat-VariableFont_wght.woff') format('woff'), url('fonts/Montserrat-VariableFont_wght.ttf') format('truetype'), url('fonts/Montserrat-VariableFont_wght.svg') format('svg');
          font-weight: normal;
          font-style: normal;
        }
      `,
          },
        },
      }),
    [mode]
  )

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={s.app}>
          <Header />
          {status === 'loading' && <LinearProgress />}
          <Pages />
          {isOpenSnackBar && <SnackBar />}
          <ToggleColorMode />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
