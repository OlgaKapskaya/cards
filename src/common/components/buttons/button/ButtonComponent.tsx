import { FC, memo } from 'react'

import Button, { ButtonProps } from '@mui/material/Button'

export const ButtonComponent: FC<ButtonProps> = memo(
  ({ variant, sx, type, className, ...restProps }) => {
    return (
      <Button
        type={type ? type : 'button'}
        sx={{
          borderRadius: '30px',
          textTransform: 'none',
          height: '35px',
          ...sx,
        }}
        variant={variant ? variant : 'contained'}
        {...restProps}
      />
    )
  }
)
