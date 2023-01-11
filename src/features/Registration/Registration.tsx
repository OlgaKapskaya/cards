import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PasswordInput } from '../../common/components/PasswordInput/PasswordInput'
import { PATH } from '../../common/constants/path'
import { registrationValidationSchema } from '../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../common/hooks/useAuthForm'
import { useShowPassword } from '../../common/hooks/useShowPassword'
import { sxBoxCreator } from '../../common/styles/sxBoxCreator'
import { sxButtonMarginTopWidthCreator } from '../../common/styles/sxButtonCreators'
import { signUp, signUpStatusCreator } from '../Login/authSlice'

import s from './Registration.module.css'

type IFormInput = {
  email: string
  password: string
  confirmPassword: string
}

export const Registration = () => {
  const { isRegistered, dispatch, navigate, register, handleSubmit, errors } =
    useAuthForm<IFormInput>(registrationValidationSchema)
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } = useShowPassword()

  const onSubmit: SubmitHandler<IFormInput> = data => dispatch(signUp(data))


  if (isRegistered) {
    setTimeout(() => {
      navigate('/login')
      dispatch(signUpStatusCreator(false))
    }, 1500)
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
              <PasswordInput
                id="password"
                showPassword={showPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                error={errors.password}
                handleClickShowPassword={handleClickShowPassword}
                register={register}
              />
              <PasswordInput
                id="confirm-password"
                showPassword={showPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                error={errors.confirmPassword}
                handleClickShowPassword={handleClickShowPassword}
                register={register}
              />
              <ButtonComponent type="submit" sx={sxButtonMarginTopWidthCreator('40px')}>
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
