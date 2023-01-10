import { FC, memo } from 'react'

import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar/Avatar'

import { useAppSelector } from '../../../common/hooks/react-redux-hooks'

import s from './ProfileAvatar.module.css'

type ProfileAvatarProps = {
  withButton?: boolean
  size: number
}

export const ProfileAvatar: FC<ProfileAvatarProps> = memo(({ withButton, size }) => {
  const userAvatar = useAppSelector(state => state.profile.profile.avatar)

  return (
    <div className={s.avatarContainer}>
      <Avatar
        alt="profileAvatar"
        src={userAvatar ? userAvatar : ''}
        sx={{ width: `${size}px`, height: `${size}px` }}
      />
      {withButton && (
        <IconButton className={s.addPhotoBtn}>
          <CameraAltOutlined />
        </IconButton>
      )}
    </div>
  )
})
