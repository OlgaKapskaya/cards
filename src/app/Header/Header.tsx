import React, { FC, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import logo from '../../assets/img/incubator-logo.svg'
import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Header.module.css'
import { ProfileMenu } from './ProfileMenu/ProfileMenu'

export const Header: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const loginHandler = () => navigate(PATH.LOGIN)

  const headerBody = useMemo(() => {
    return isLoggedIn ? (
      <ProfileMenu />
    ) : (
      <ButtonComponent type="submit" className={s.button} onClick={loginHandler}>
        Sign in
      </ButtonComponent>
    )
  }, [isLoggedIn])

  return (
    <header className={s.header}>
      <img src={logo} alt="logo" className={s.logo} />
      {headerBody}
    </header>
  )
}
