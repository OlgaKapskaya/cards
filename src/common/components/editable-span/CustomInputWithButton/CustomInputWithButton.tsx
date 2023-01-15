import { ChangeEvent, FC, KeyboardEvent, MouseEvent } from 'react'

import Button from '@mui/material/Button'
import Input, { InputProps } from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'

import s from './CustomInputWithButton.module.css'

export type CustomInputWithButtonPropsType = InputProps & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  spanClassName?: string
  buttonName?: string
  inputLabel?: string
  errorText?: string
}

export const CustomInputWithButton: FC<CustomInputWithButtonPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onBlur,
  onEnter,
  errorText,
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

  const onMouseDownHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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
            <Button
              className={s.inputButton}
              sx={buttonStyle}
              onClick={onEnter}
              onMouseDown={onMouseDownHandler}
              disabled={restProps.value === ''}
            >
              {buttonName}
            </Button>
          </InputAdornment>
        }
      />
    </div>
  )
}
