import React, { FC, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import logo from '../../assets/img/incubator-logo.svg'
import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/reactReduxHooks'
import { isLoggedInSelector } from '../../common/selectors/authSelectors'

import s from './Header.module.css'
import { ProfileMenu } from './profile-menu/ProfileMenu'

export const Header: FC = () => {
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
        onClick={isLoggedIn ? () => navigate(PATH.PACKS) : () => navigate(PATH.LOGIN)}
      />
      <ButtonComponent onClick={() => navigate(PATH.PACKS)}>packs</ButtonComponent>
      {headerBody}
    </header>
  )
}
