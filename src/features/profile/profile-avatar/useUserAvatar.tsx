import { useMemo } from 'react'

import Avatar from '@mui/material/Avatar/Avatar'

import { useAppSelector, userAvatarSelector, userNameSelector } from 'common'

export const useUserAvatar = (size: number) => {
  const userAvatar = useAppSelector(userAvatarSelector)
  const userName = useAppSelector(userNameSelector)

  //если нет аватарки, показать инициалы
  return useMemo(() => {
    return userAvatar && /^data:image/.test(userAvatar) ? (
      <Avatar
        alt="profileAvatar"
        src={userAvatar ? userAvatar : ''}
        sx={{ width: `${size}px`, height: `${size}px`, backgroundColor: '#1976d2' }}
      />
    ) : (
      <Avatar
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#1976d2',
          fontSize: `${size / 2}px`,
        }}
      >
        {userName && userName.split(' ').length === 2
          ? userName.split(' ')[0][0].toUpperCase() + userName.split(' ')[1][0].toUpperCase()
          : userName.split(' ')[0][0].toUpperCase()}
      </Avatar>
    )
  }, [userAvatar, userName])
}
