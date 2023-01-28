import React, { useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './Header.module.css'
import { ProfileMenu } from './profile-menu/ProfileMenu'

import logo from 'assets/img/incubator-logo.svg'
import { ButtonComponent, useAppSelector, isLoggedInSelector } from 'common'
import { PATH } from 'common/constants/path'

export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  const navigate = useNavigate()
  const loginHandler = () => navigate(PATH.LOGIN)

  const headerBody = useMemo(() => {
    return isLoggedIn ? (
      <ProfileMenu />
    ) : (
      <ButtonComponent type="submit" sx={{ width: '113px' }} onClick={loginHandler}>
        Sign in
      </ButtonComponent>
    )
  }, [isLoggedIn])

  return (
    <header className={s.header}>
      <img
        src={logo}
        alt="logo"
        className={s.logo}
        onClick={() => (isLoggedIn ? navigate(PATH.PACKS) : navigate(PATH.LOGIN))}
      />
      {headerBody}
    </header>
  )
}
