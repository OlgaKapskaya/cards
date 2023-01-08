import { FC } from 'react'

import { KeyboardBackspace } from '@mui/icons-material'
import { Navigate, NavLink } from 'react-router-dom'

import logout from '../../assets/img/logout.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Profile.module.css'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar'
import { ProfilePersonalInfo } from './ProfilePersonalInfo/ProfilePersonalInfo'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  return (
    <div className={s.mainContainer}>
      {/*!isLoggedIn && <Navigate to={PATH.LOGIN} />*/}
      <NavLink to={''} className={s.backLink}>
        <KeyboardBackspace />
        Back to Packs List
      </NavLink>
      <div className={s.profileContainer}>
        <span className={s.title}>Personal Information</span>
        <ProfileAvatar />
        <ProfilePersonalInfo />
        <SuperButton className={s.logoutBtn}>
          <img src={logout} alt="logout" /> Log out
        </SuperButton>
      </div>
    </div>
  )
}
