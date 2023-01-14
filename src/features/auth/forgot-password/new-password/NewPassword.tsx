import { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { SubmitHandler } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import { ButtonComponent } from '../../../../common/components/button/ButtonComponent'
import { PasswordInput } from '../../../../common/components/password-input/PasswordInput'
import { PATH } from '../../../../common/constants/path'
import { newPasswordValidationScheme } from '../../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../../common/hooks/useAuthForm'
import { sxBoxCreator } from '../../../../common/utils/styles-utils/sxBoxCreator'
import { sxButtonMarginTopWidthCreator } from '../../../../common/utils/styles-utils/sxButtonCreators'
import { createNewPassword, recoveredPasswordStatus } from '../../authSlice'

import s from './NewPassword.module.css'

export interface INewPasswordForm {
  password: string
}

export const NewPassword: FC = () => {
  const { isRecoveredPassword, dispatch, register, errors, handleSubmit } =
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
              <ButtonComponent type="submit" sx={sxButtonMarginTopWidthCreator()}>
                Create new password
              </ButtonComponent>
            </form>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
