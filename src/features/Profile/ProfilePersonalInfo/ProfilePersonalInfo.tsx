import { FC } from 'react'

import SuperEditableSpan from '../../../common/components/SuperEditableSpan/SuperEditableSpan'

import s from './ProfilePersonalInfo.module.css'

export const ProfilePersonalInfo: FC = () => {
  return (
    <div className={s.profileInfoContainer}>
      <SuperEditableSpan
        spanProps={{ defaultText: 'test name' }}
        inputLabel="Nickname"
        buttonName="SAVE"
      />
      <span className={s.email}> j&johnson@gmail.com </span>
    </div>
  )
}
