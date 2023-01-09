import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import logo from '../../assets/img/incubator-logo.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Header.module.css'

export const Header: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  return (
    <header className={s.header}>
      <img src={logo} alt="logo" className={s.logo} />
      {!isLoggedIn && (
        <SuperButton onClick={() => navigate(PATH.LOGIN)} className={s.button}>
          {' '}
          Sign in
        </SuperButton>
      )}
    </header>
  )
}
