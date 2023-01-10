import { FC, memo } from 'react'

import Button, { ButtonProps } from '@mui/material/Button'

export const ButtonComponent: FC<ButtonProps> = memo(
  ({ variant, sx, type, className, ...restProps }) => {
    const finalSX = {
      borderRadius: '30px',
      ...sx,
    }

    return (
      <Button
        type={type ? type : 'button'}
        sx={finalSX}
        variant={variant ? variant : 'contained'}
        {...restProps}
      />
    )
  }
)
