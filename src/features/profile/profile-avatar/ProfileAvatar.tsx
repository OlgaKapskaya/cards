import { ChangeEvent, FC, memo } from 'react'

import IconButton from '@mui/material/IconButton'

import { changeUserDataTC } from '../profileSlice'

import s from './ProfileAvatar.module.css'
import { useUserAvatar } from './useUserAvatar'

import { setAppMessage, setAppStatus } from 'app/appSlice'
import { ReactComponent as Camera } from 'assets/img/photo.svg'
import { useAppDispatch, convertToBase64 } from 'common'

type ProfileAvatarProps = {
  withButton?: boolean
  size: number
}

export const ProfileAvatar: FC<ProfileAvatarProps> = memo(({ withButton, size }) => {
  const dispatch = useAppDispatch()
  const avatar = useUserAvatar(size)

  const onChangeAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      //преобразуем размер в MB
      const fileSizeMB = file.size / 1024 ** 2

      if (fileSizeMB < 1) {
        convertToBase64(file, (file64: string) => {
          dispatch(changeUserDataTC({ avatar: file64 }))
        })
      } else {
        dispatch(setAppMessage('The file is too large'))
        dispatch(setAppStatus('failed'))
      }
    }
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
            onChange={onChangeAvatarHandler}
            accept="image/png, image/jpeg"
          />
        </IconButton>
      )}
    </div>
  )
})
