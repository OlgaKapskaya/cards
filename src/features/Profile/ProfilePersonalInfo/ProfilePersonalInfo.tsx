import { FC, useEffect, useState } from 'react'

import SuperEditableSpan from '../../../common/components/SuperEditableSpan/SuperEditableSpan'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { changeUserDataTC } from '../profileSlice'

import s from './ProfilePersonalInfo.module.css'

export const ProfilePersonalInfo: FC = () => {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(state => state.profile.profile.name)
  const userEmail = useAppSelector(state => state.profile.profile.email)

  const [newName, setNewName] = useState<string>(userName)

  useEffect(() => {
    if (userName === newName) return
    setNewName(userName)
  }, [userName])

  const onChangeNameHandler = (text: string) => {
    setNewName(text)
  }
  const onChangeUserName = () => {
    dispatch(changeUserDataTC({ name: newName }))
  }

  return (
    <div className={s.profileInfoContainer}>
      <SuperEditableSpan
        onChangeText={onChangeNameHandler}
        onEnter={onChangeUserName}
        value={newName}
        spanProps={{ defaultText: 'user name' }}
        inputLabel="Nickname"
        buttonName="SAVE"
      />
      <span className={s.email}> {userEmail} </span>
    </div>
  )
}
