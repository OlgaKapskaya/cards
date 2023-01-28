import { FC } from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { Navigate, NavLink } from 'react-router-dom'

import { LoginRequestType } from '../authAPI'
import { login } from '../authSlice'

import s from './Login.module.css'

import {
  ButtonComponent,
  PasswordInput,
  loginValidationSchema,
  sxBoxCreator,
  sxButtonMarginTopWidthCreator,
} from 'common'
import { PATH } from 'common/constants/path'
import { useAuthForm } from 'common/hooks/useAuthForm'

export const Login: FC = () => {
  const { isLoggedIn, dispatch, register, handleSubmit, errors, appStatus } =
    useAuthForm<LoginRequestType>(loginValidationSchema)

  const onSubmit = (data: LoginRequestType) => {
    dispatch(login(data))
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PACKS} />
  }

  return (
    <Box sx={sxBoxCreator(552)}>
      <Paper elevation={3}>
        <div className={s.paper_container}>
          <div className={s.title}>Sign in</div>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <TextField
              className={s.email}
              sx={{ m: 1, width: '347px' }}
              id="email"
              label="Email"
              variant="standard"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <PasswordInput id="password" error={errors.password} register={register} />

            <div className={s.checkbox}>
              <Checkbox id="rememberMe" {...register('rememberMe')} />
              <span>Remember me</span>
            </div>
            <NavLink className={s.forgot} to={PATH.PASSWORD_RECOVERY}>
              Forgot Password?
            </NavLink>
            <ButtonComponent
              type="submit"
              sx={sxButtonMarginTopWidthCreator('60px')}
              disabled={appStatus === 'loading'}
            >
              Sign In
            </ButtonComponent>
          </form>

          <div className={s.already}>{`Don't have an account yet?`}</div>
          <NavLink className={s.singUp} to={PATH.REGISTRATION}>
            Create one
          </NavLink>
        </div>
      </Paper>
    </Box>
  )
}
