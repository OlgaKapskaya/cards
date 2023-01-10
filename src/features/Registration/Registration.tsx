import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Alert, IconButton, InputAdornment, InputLabel, Snackbar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { PATH } from '../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Registration.module.css'
import { signUpStatusCreator } from './registrationSlice'
import { signUp } from './registrationThunk'

type IFormInput = {
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object({
  email: yup.string().email(),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onTouched' })
  const onSubmit: SubmitHandler<IFormInput> = data => dispatch(signUp(data))
  const dispatch = useAppDispatch()
  const signUpStatus = useAppSelector(state => state.signUp.isRegistered)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(signUpStatusCreator(false))
  }

  const navigate = useNavigate()

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
              </FormControl>
              {errors.confirmPassword && (
                <span className={s.error}>{errors.confirmPassword.message}</span>
              )}

              <Button
                type="submit"
                className={s.btn}
                sx={{ borderRadius: '30px', mt: '60px' }}
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
