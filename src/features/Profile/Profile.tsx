import { FC } from 'react'

import { Navigate } from 'react-router-dom'

import logout from '../../assets/img/logout.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/constants/path'
import { useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Profile.module.css'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar'
import { ProfileBackLink } from './ProfileBackLink/ProfileBackLink'
import { ProfilePersonalInfo } from './ProfilePersonalInfo/ProfilePersonalInfo'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)

  return (
    <div className={s.mainContainer}>
      {!isLoggedIn && <Navigate to={PATH.LOGIN} />}
      <ProfileBackLink />
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
