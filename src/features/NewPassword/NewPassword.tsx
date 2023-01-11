import { FC, MouseEvent, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PasswordInput } from '../../common/components/PasswordInput/PasswordInput'
import { sxBoxCreator } from '../../common/styles/sxBoxCreator'
import { sxButtonMarginTopWidthCreator } from '../../common/styles/sxButtonCreators'

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
      <Box sx={sxBoxCreator(408)}>
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Create new password</div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <PasswordInput
                id="password"
                showPassword={showPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                error={errors.password}
                handleClickShowPassword={handleClickShowPassword}
                register={register}
              />
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
