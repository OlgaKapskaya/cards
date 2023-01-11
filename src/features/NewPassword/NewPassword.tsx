import { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PasswordInput } from '../../common/components/PasswordInput/PasswordInput'
import { newPasswordValidationScheme } from '../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../common/hooks/useAuthForm'
import { sxBoxCreator } from '../../common/styles/sxBoxCreator'
import { sxButtonMarginTopWidthCreator } from '../../common/styles/sxButtonCreators'
import { createNewPassword } from '../Login/authSlice'

import s from './NewPassword.module.css'

export interface INewPasswordForm {
  password: string
}

export const NewPassword: FC = () => {
  const { dispatch, register, errors, handleSubmit } = useAuthForm<INewPasswordForm>(
    newPasswordValidationScheme
  )

  const params = useParams<{ token: string }>()

  const onSubmit: SubmitHandler<INewPasswordForm> = data => {
    if (params.token)
      dispatch(
        createNewPassword({
          password: data.password,
          resetPasswordToken: params.token,
        })
      )
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
