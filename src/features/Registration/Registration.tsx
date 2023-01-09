import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, InputLabel } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAppDispatch } from '../../common/hooks/react-redux-hooks'

import s from './Registration.module.css'
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

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div className={s.container}>
      <div className={s.formBlock}>
        <h2 className={s.header}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <FormControl sx={{ padding: 4 }}>
            <FormGroup>
              <TextField
                required
                id="standard-required"
                label="Email"
                variant="standard"
                {...register('email')}
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
              <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password-required">Password</InputLabel>
                <Input
                  id="standard-adornment-password-required"
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
                  {...register('password', { required: 'Password is required!' })}
                />
              </FormControl>
              {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
              <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
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
                <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
              )}
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Sign Up
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}
