import { FC, useMemo } from 'react'

import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/img/incubator-logo.svg'
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
      <Button
        onClick={loginHandler}
        className={s.button}
        sx={{ borderRadius: '30px' }}
        variant="contained"
      >
        Sign in
      </Button>
    )
  }, [isLoggedIn])

  return (
    <header className={s.header}>
      <img src={logo} alt="logo" className={s.logo} />
      {headerBody}
    </header>
  )
}
