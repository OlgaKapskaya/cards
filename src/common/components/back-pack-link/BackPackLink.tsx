import { FC } from 'react'

import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../constants/path'

import s from './BackPackLink.module.css'

export const BackPackLink: FC = () => {
  return (
    <NavLink to={PATH.PACKS} className={s.backLink}>
      <KeyboardBackspace />
      Back to Packs List
    </NavLink>
  )
}
