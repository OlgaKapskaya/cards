import { FC } from 'react'

import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar/Avatar'

import logout from '../../assets/img/logout.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan'

import s from './Profile.module.css'

export const Profile: FC = () => {
  return (
    <div className={s.mainContainer}>
      <div className={s.profileContainer}>
        <span className={s.title}>Personal Information</span>
        <div className={s.avatarContainer}>
          <Avatar alt="profileImg" src="" sx={{ width: '96px', height: '96px' }} />
          <IconButton className={s.addPhotoBtn}>
            <CameraAltOutlined />
          </IconButton>
        </div>
        <SuperEditableSpan value="test name" />
        <span className={s.email}> j&johnson@gmail.com </span>
        <SuperButton className={s.logoutBtn}>
          <img src={logout} alt="logout" /> Log out
        </SuperButton>
      </div>
    </div>
  )
}
