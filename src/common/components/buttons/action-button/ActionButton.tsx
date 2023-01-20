import React, { FC, memo } from 'react'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import s from './ActionButton.module.css'

type ActionButtonPropsType = IconButtonProps & {
  icon: string
  hint?: string
}
export const ActionButton: FC<ActionButtonPropsType> = memo(({ icon, hint, ...restProps }) => {
  return (
    <>
      <Tooltip title={hint} arrow>
        <IconButton size="small" {...restProps}>
          <img src={icon} className={s.icon} alt="action" />
        </IconButton>
      </Tooltip>
    </>
  )
})
