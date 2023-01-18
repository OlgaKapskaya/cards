import React, { FC } from 'react'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'

import s from './ActionButton.module.css'

type ActionButtonPropsType = IconButtonProps & {
  icon: string
}
export const ActionButton: FC<ActionButtonPropsType> = ({ icon, ...restProps }) => {
  return (
    <IconButton size="small" {...restProps}>
      <img src={icon} className={s.icon} alt="action" />
    </IconButton>
  )
}
