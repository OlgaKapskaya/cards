import { FC, MouseEvent, useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'

import { useNewPasswordForm } from './hooks/useNewPasswordForm'
import s from './NewPassword.module.css'

export interface INewPasswordForm {
  password: string
}

export const NewPassword: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const { register, handleSubmit, errors, onSubmit } = useNewPasswordForm()

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 413,
            height: 408,
            margin: '50px auto',
          },
        }}
      >
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Create new password</div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <FormControl sx={{ m: 1, width: '347px' }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true, maxLength: 80 })}
                  error={!!errors.password}
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
                {errors.password && <span className={s.error}>{errors.password?.message}</span>}
              </FormControl>
              <p className={s.textInfo}>
                {`Create new password and we will send you further instructions to email`}
              </p>
              <Button
                type="submit"
                className={s.btn}
                sx={{ borderRadius: '30px', mt: '35px' }}
                variant="contained"
                // onClick={() => navigate(PATH.LOGIN)}
              >
                Create new password
              </Button>
            </form>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
