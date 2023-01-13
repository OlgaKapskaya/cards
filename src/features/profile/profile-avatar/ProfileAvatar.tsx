import { FC, memo } from 'react'

import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined'
import Avatar from '@mui/material/Avatar/Avatar'
import IconButton from '@mui/material/IconButton'

import { useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { userAvatarSelector } from '../../../common/selectors/profileSelectors'

import s from './ProfileAvatar.module.css'

type ProfileAvatarProps = {
  withButton?: boolean
  size: number
}

export const ProfileAvatar: FC<ProfileAvatarProps> = memo(({ withButton, size }) => {
  const userAvatar = useAppSelector(userAvatarSelector)

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
