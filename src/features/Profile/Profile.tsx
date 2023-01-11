import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import logoutImg from '../../assets/img/logout.svg'
import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PATH } from '../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { logout } from '../Login/authSlice'

import s from './Profile.module.css'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar'
import { ProfileBackLink } from './ProfileBackLink/ProfileBackLink'
import { ProfilePersonalInfo } from './ProfilePersonalInfo/ProfilePersonalInfo'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.mainContainer}>
      <ProfileBackLink />
      <div className={s.profileContainer}>
        <span className={s.title}>Personal Information</span>
        <ProfileAvatar withButton size={96} />
        <ProfilePersonalInfo />

        <ButtonComponent
          sx={{
            mb: '30px',
            mt: '20px',
            width: '127px',
            background: '#fcfcfc',
            color: 'black',
            textTransform: 'none',
            ':hover': {
              background: '#fcfcfc',
              color: 'black',
            },
          }}
          className={s.logoutBtn}
          onClick={logoutHandler}
        >
          <img src={logoutImg} alt="logout" className={s.logoutImg} /> Log out
        </ButtonComponent>
      </div>
    </div>
  )
}
