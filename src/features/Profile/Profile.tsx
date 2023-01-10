import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import logoutImg from '../../assets/img/logout.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
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
        {/*<ButtonComponent className={s.logoutBtn} onClick={logoutHandler}>*/}
        {/*  <img src={logoutImg} alt="logout" /> Log out*/}
        {/*</ButtonComponent>*/}
        <SuperButton className={s.logoutBtn} onClick={logoutHandler}>
          <img src={logoutImg} alt="logout" /> Log out
        </SuperButton>
      </div>
    </div>
  )
}
