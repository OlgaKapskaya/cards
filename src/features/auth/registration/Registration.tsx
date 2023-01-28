import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { signUp, signUpStatusCreator } from '../authSlice'

import s from './Registration.module.css'

import {
  ButtonComponent,
  PasswordInput,
  registrationValidationSchema,
  sxBoxCreator,
  sxButtonMarginTopWidthCreator,
} from 'common'
import { PATH } from 'common/constants/path'
import { useAuthForm } from 'common/hooks/useAuthForm'

type IFormInput = {
  email: string
  password: string
  confirmPassword: string
}

export const Registration = () => {
  const { isRegistered, dispatch, register, navigate, handleSubmit, errors, appStatus } =
    useAuthForm<IFormInput>(registrationValidationSchema)
  const onSubmit: SubmitHandler<IFormInput> = data =>
    dispatch(signUp({ email: data.email, password: data.password }))

  if (isRegistered) {
    setTimeout(() => {
      navigate(PATH.LOGIN)
      dispatch(signUpStatusCreator(false))
    }, 500)
  }

  return (
    <div>
      <Box sx={sxBoxCreator(552)}>
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
              <PasswordInput id="password" error={errors.password} register={register} />
              <PasswordInput
                id="confirmPassword"
                error={errors.confirmPassword}
                register={register}
              />
              <ButtonComponent
                type="submit"
                sx={sxButtonMarginTopWidthCreator('40px')}
                disabled={appStatus === 'loading'}
              >
                Sign Up
              </ButtonComponent>
            </form>

            <div className={s.already}>Already have an account?</div>
            <NavLink className={s.signIn} to={PATH.LOGIN}>
              Sign In
            </NavLink>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
