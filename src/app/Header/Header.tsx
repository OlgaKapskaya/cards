import { FC } from 'react'

import logo from '../../assets/img/incubator-logo.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Header.module.css'

export const Header: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.app.isLoggedIn)

  return (
    <header className={s.header}>
      <img src={logo} alt="logo" className={s.logo} />
      {!isLoggedIn && <SuperButton className={s.button}> Sign in</SuperButton>}
    </header>
  )
}
