import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import logoutImg from '../../assets/img/logout.svg'
import { BackPackLink } from '../../common/components/back-pack-link/BackPackLink'
import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { buttonWhite } from '../../common/constants/theme'
import { useAppDispatch } from '../../common/hooks/reactReduxHooks'
import { sxBoxCreator } from '../../common/utils/styles-utils/sxBoxCreator'
import { sxButtonColorCreator } from '../../common/utils/styles-utils/sxButtonCreators'
import { logout } from '../auth/authSlice'

import { ProfileAvatar } from './profile-avatar/ProfileAvatar'
import { ProfilePersonalInfo } from './profile-personal-info/ProfilePersonalInfo'
import s from './Profile.module.css'

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
