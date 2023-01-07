import { FC, useEffect } from 'react'

import logout from '../../assets/img/logout.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import { useAppDispatch } from '../../common/hooks/react-redux-hooks'

import s from './Profile.module.css'
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar'
import { ProfilePersonalInfo } from './ProfilePersonalInfo/ProfilePersonalInfo'
import { changeUserNameTC } from './profileSlice'

export const Profile: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(changeUserNameTC('new name'))
  }, [])

  return (
    <div className={s.mainContainer}>
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
