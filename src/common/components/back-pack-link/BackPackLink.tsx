import { FC } from 'react'

import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../constants/path'
import { useAppSelector } from '../../hooks'
import { appStatusSelector } from '../../selectors/appSelectors'

import s from './BackPackLink.module.css'

export const BackPackLink: FC = () => {
  const appStatus = useAppSelector(appStatusSelector)

  return (
    <div>
      {appStatus !== 'loading' && (
        <NavLink to={PATH.PACKS} className={s.backLink}>
          <KeyboardBackspace />
          Back to Packs List
        </NavLink>
      )}
    </div>
  )
}
