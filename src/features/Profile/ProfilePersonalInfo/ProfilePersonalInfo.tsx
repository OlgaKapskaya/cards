import { FC, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import SuperEditableSpan from '../../../common/components/SuperEditableSpan/SuperEditableSpan'
import { PATH } from '../../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { changeUserData } from '../profileSlice'

import s from './ProfilePersonalInfo.module.css'

export const ProfilePersonalInfo: FC = () => {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(state => state.profile.profile.name)
  const userEmail = useAppSelector(state => state.profile.profile.email)
  const [newName, setNewName] = useState<string>(userName)

  useEffect(() => {
    if (JSON.stringify(userName) === JSON.stringify(newName)) return
    setNewName(userName)
  }, [userName])

  const onChangeNameHandler = (text: string) => {
    setNewName(text)
  }
  const onChangeUserName = () => {
    dispatch(changeUserData(newName))
  }
  // const navigate = useNavigate()
  //
  //   !isAutorized && navigate(PATH.LOGIN)

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
