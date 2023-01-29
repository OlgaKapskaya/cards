import { FC, memo } from 'react'

import IconButton from '@mui/material/IconButton'

import { changeUserDataTC } from '../profileSlice'

import s from './ProfileAvatar.module.css'
import { useUserAvatar } from './useUserAvatar'

import { ReactComponent as Camera } from 'assets/img/photo.svg'
import { useAppDispatch } from 'common'
import { onChangeImg } from 'common/utils/convertToBase64'

type ProfileAvatarProps = {
  withButton?: boolean
  size: number
}

export const ProfileAvatar: FC<ProfileAvatarProps> = memo(({ withButton, size }) => {
  const dispatch = useAppDispatch()
  const avatar = useUserAvatar(size)

  const onChangeAvatarHandler = (file64: string) => {
    dispatch(changeUserDataTC({ avatar: file64 }))
  }

  return (
    <div className={s.avatarContainer}>
      {avatar}
      {withButton && (
        <IconButton component="label">
          <Camera />
          <input
            type="file"
            hidden
            onChange={e => onChangeImg(e, dispatch, onChangeAvatarHandler)}
            accept="image/png, image/jpeg"
          />
        </IconButton>
      )}
    </div>
  )
})
