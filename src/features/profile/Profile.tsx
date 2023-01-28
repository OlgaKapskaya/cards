import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { ProfileAvatar } from './profile-avatar/ProfileAvatar'
import { ProfilePersonalInfo } from './profile-personal-info/ProfilePersonalInfo'
import s from './Profile.module.css'

import logoutImg from 'assets/img/logout.svg'
import {
  BackPackLink,
  ButtonComponent,
  buttonWhite,
  useAppDispatch,
  sxBoxCreator,
  sxButtonColorCreator,
} from 'common'
import { logout } from 'features/auth/authSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={s.mainContainer}>
      <BackPackLink />
      <Box sx={sxBoxCreator(360)}>
        <Paper elevation={3}>
          <div className={s.profileContainer}>
            <span className={s.title}>Personal Information</span>
            <ProfileAvatar withButton size={96} />
            <ProfilePersonalInfo />

            <ButtonComponent sx={sxButtonColorCreator(buttonWhite)} onClick={logoutHandler}>
              <img src={logoutImg} alt="logout" className={s.logoutImg} /> Log out
            </ButtonComponent>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
