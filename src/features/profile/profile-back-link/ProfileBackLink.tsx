import { FC } from 'react'

import { KeyboardBackspace } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

import s from './ProfileBackLink.module.css'

export const ProfileBackLink: FC = () => {
  return (
    <NavLink to={''} className={s.backLink}>
      <KeyboardBackspace />
      Back to Packs List
    </NavLink>
  )
}
