import { FC, memo, MouseEvent } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'

import s from './PasswordInput.module.css'

type PasswordInputProps = {
  id: string
  register: any
  error: any
  showPassword: boolean
  handleClickShowPassword: () => void
  handleMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void
}
export const PasswordInput: FC<PasswordInputProps> = memo(
  ({ id, register, error, showPassword, handleClickShowPassword, handleMouseDownPassword }) => {
    return (
      <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          {...register(id)}
          error={!!error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {error && <span className={s.error}>{error.message}</span>}
      </FormControl>
    )
  }
)
