import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, IconButton, InputAdornment, InputLabel, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../common/constants/path'
import { registrationValidationSchema } from '../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../common/hooks/useAuthForm'
import { useShowPassword } from '../../common/hooks/useShowPassword'
import { signUp, signUpStatusCreator } from '../Login/authSlice'

import s from './Registration.module.css'

type IFormInput = {
  email: string
  password: string
  confirmPassword: string
}

export const Registration = () => {
  const { signUpStatus, dispatch, navigate, register, handleSubmit, errors } =
    useAuthForm<IFormInput>(registrationValidationSchema)
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword()

  const onSubmit: SubmitHandler<IFormInput> = data => dispatch(signUp(data))
  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(signUpStatusCreator(false))
  }

  if (signUpStatus) {
    setTimeout(() => {
      navigate('/login')
      dispatch(signUpStatusCreator(false))
    }, 1500)
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 413,
            height: 552,
            margin: '50px auto',
          },
        }}
      >
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Sign Up</div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <TextField
                className={s.email}
                sx={{ m: 1, width: '347px' }}
                id="email"
                label="Email"
                variant="standard"
                {...register('email', { required: 'Email is required!' })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <FormControl className={s.password} sx={{ m: 1, width: '347px' }} variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: 'Password is required!' })}
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
              <FormControl variant="standard" className={s.password} sx={{ m: 1, width: '347px' }}>
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.confirmPassword}
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
                  {...register('confirmPassword', {
                    required: 'Please confirm password!',
                  })}
                />
                {errors.confirmPassword && (
                  <span className={s.error}>{errors.confirmPassword.message}</span>
                )}
              </FormControl>

              <Button
                type="submit"
                className={s.btn}
                sx={{ borderRadius: '30px', mt: '40px' }}
                variant="contained"
              >
                Sign Up
              </Button>
            </form>

            <div className={s.already}>Already have an account?</div>
            <NavLink className={s.signIn} to={PATH.LOGIN}>
              Sign In
            </NavLink>
          </div>
        </Paper>
      </Box>
      {signUpStatus && (
        <Snackbar open={signUpStatus} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              width: '100%',
              backgroundColor: '#2e7d32',
              color: 'white',
              '& .MuiAlert-icon': {
                color: 'white',
                marginTop: '18px',
                marginRight: '12px',
                padding: '3px 0',
              },
            }}
          >
            {<p>You are successfully registered</p>}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}
