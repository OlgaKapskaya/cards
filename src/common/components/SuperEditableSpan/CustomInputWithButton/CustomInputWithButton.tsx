import { ChangeEvent, KeyboardEvent, FC, ReactNode } from 'react'

import { Button, Input, InputAdornment, InputLabel, InputProps } from '@mui/material'

import s from './CustomInputWithButton.module.css'

export type CustomInputWithButtonPropsType = InputProps & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  buttonName?: string
  inputLabel?: string
}

export const CustomInputWithButton: FC<CustomInputWithButtonPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onBlur,
  onEnter,
  error,
  className,
  spanClassName,
  id,
  buttonName,
  inputLabel,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e)
    onEnter && e.key === 'Enter' && onEnter()
  }

  const buttonStyle = {
    background: '#366eff',
    color: '#fff',
    '&:hover': {
      background: '#0080ff',
    },
  }

  return (
    <div>
      <InputLabel className={s.label}>{inputLabel}</InputLabel>
      <Input
        id={id}
        type="text"
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        onBlur={onBlur}
        {...restProps}
        endAdornment={
          <InputAdornment position="end">
            <Button className={s.inputButton} sx={buttonStyle}>
              {buttonName}
            </Button>
          </InputAdornment>
        }
      />
    </div>
  )
}
