import { FC, memo } from 'react'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import s from './ActionButton.module.css'

type ActionButtonPropsType = IconButtonProps & {
  icon: string
  hint?: string
}
export const ActionButton: FC<ActionButtonPropsType> = memo(({ icon, hint, ...restProps }) => {
  return (
    <IconButton
      size="small"
      className={restProps.disabled ? s.disabled : restProps.className}
      {...restProps}
    >
      <Tooltip title={hint} arrow>
        <img src={icon} className={s.icon} alt="action" />
      </Tooltip>
    </IconButton>
  )
})
