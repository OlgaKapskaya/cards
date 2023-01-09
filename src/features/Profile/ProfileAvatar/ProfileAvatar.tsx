import { FC } from 'react'

import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar/Avatar'

import s from './ProfileAvatar.module.css'

export const ProfileAvatar: FC = () => {
  return (
    <div className={s.avatarContainer}>
      <Avatar alt="profileImg" src="" sx={{ width: '96px', height: '96px' }} />
      <IconButton className={s.addPhotoBtn}>
        <CameraAltOutlined />
      </IconButton>
    </div>
  )
}
