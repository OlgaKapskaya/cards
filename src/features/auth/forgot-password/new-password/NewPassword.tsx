import { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { SubmitHandler } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import { createNewPassword, recoveredPasswordStatus } from '../../authSlice'

import s from './NewPassword.module.css'

import {
  ButtonComponent,
  PasswordInput,
  newPasswordValidationScheme,
  sxBoxCreator,
  sxButtonMarginTopWidthCreator,
} from 'common'
import { PATH } from 'common/constants/path'
import { useAuthForm } from 'common/hooks/useAuthForm'

export interface INewPasswordForm {
  password: string
}

export const NewPassword: FC = () => {
  const { isRecoveredPassword, dispatch, register, errors, handleSubmit, appStatus } =
    useAuthForm<INewPasswordForm>(newPasswordValidationScheme)

  const { token } = useParams<{ token: string }>()

  const onSubmit: SubmitHandler<INewPasswordForm> = data => {
    if (token)
      dispatch(
        createNewPassword({
          password: data.password,
          resetPasswordToken: token,
        })
      )
  }

  if (isRecoveredPassword) {
    dispatch(recoveredPasswordStatus(false))

    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div>
      <Box sx={sxBoxCreator(408)}>
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Create new password</div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <PasswordInput id="password" error={errors.password} register={register} />
              <p className={s.textInfo}>
                {`Create new password and we will send you further instructions to email`}
              </p>
              <ButtonComponent
                type="submit"
                sx={sxButtonMarginTopWidthCreator()}
                disabled={appStatus === 'loading'}
              >
                Create new password
              </ButtonComponent>
            </form>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
