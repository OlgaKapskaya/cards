import { FC, useEffect, useState } from 'react'

import { setAppMessage, setAppStatus } from '../../../app/appSlice'
import EditableSpanComponent from '../../../common/components/editable-span/EditableSpanComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { userEmailSelector, userNameSelector } from '../../../common/selectors/profileSelectors'
import { changeUserDataTC } from '../profileSlice'

import s from './ProfilePersonalInfo.module.css'

export const ProfilePersonalInfo: FC = () => {
  const dispatch = useAppDispatch()

  const userName = useAppSelector(userNameSelector)
  const userEmail = useAppSelector(userEmailSelector)

  const [newName, setNewName] = useState<string>(userName)

  useEffect(() => {
    if (userName === newName) return
    setNewName(userName)
  }, [userName])

  const onChangeNameHandler = (text: string) => {
    setNewName(text)
  }
  const onChangeUserNameHandler = () => {
    if (newName === '') {
      dispatch(setAppMessage('Nickname cannot be empty'))
      dispatch(setAppStatus('failed'))
      setNewName(userName)

      return
    }
    if (userName === newName) {
      return
    }
    dispatch(changeUserDataTC({ name: newName }))
  }

  return (
    <div className={s.profileInfoContainer}>
      <EditableSpanComponent
        onChangeText={onChangeNameHandler}
        onEnter={onChangeUserNameHandler}
        onBlur={onChangeUserNameHandler}
        value={newName}
        inputLabel="Nickname"
        buttonName="SAVE"
      />
      <span className={s.email}> {userEmail} </span>
    </div>
  )
}