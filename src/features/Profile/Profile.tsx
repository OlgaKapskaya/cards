import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'

import logoutImg from '../../assets/img/logout.svg'
import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PATH } from '../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'
import { sxBoxCreator } from '../../common/styles/sxBoxCreator'
import { sxButtonColorCreator } from '../../common/styles/sxButtonCreators'
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
      <Box sx={sxBoxCreator(360)}>
        <Paper elevation={3}>
          <div className={s.profileContainer}>
            <span className={s.title}>Personal Information</span>
            <ProfileAvatar withButton size={96} />
            <ProfilePersonalInfo />

            <ButtonComponent sx={sxButtonColorCreator('#FCFCFC', '#000')} onClick={logoutHandler}>
              <img src={logoutImg} alt="logout" className={s.logoutImg} /> Log out
            </ButtonComponent>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
