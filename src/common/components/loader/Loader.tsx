import { FC } from 'react'

import { CircularProgress } from '@mui/material'

import s from './Loader.module.css'

export const Loader: FC = () => {
  return (
    <div className={s.container}>
      <CircularProgress />
    </div>
  )
}
