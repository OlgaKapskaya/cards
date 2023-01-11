import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import { PATH } from '../../common/constants/path'
import { forgotValidationSchema } from '../../common/constants/validators/validationSchemes'
import { useAppDispatch } from '../../common/hooks/react-redux-hooks'
import { sxBoxCreator } from '../../common/styles/sxBoxCreator'
import { sxButtonMarginTopWidthCreator } from '../../common/styles/sxButtonCreators'
import { forgotPass } from '../Login/authSlice'

import s from './PasswordRecovery.module.css'

type IFormInput = {
  email: string
}

const customMessage = `
                  <div style="background-color: indianred; padding: 15px">
                      password recovery link: 
                    <a href="http://localhost:3000/#/set-new-password/$token$">
                      link
                    </a>
                  </div>`

export const PasswordRecovery: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(forgotValidationSchema), mode: 'onTouched' })
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IFormInput> = data => {
    const model = {
      email: data.email,
      from: 'test-front-admin <kadegrob.kirill@gmail.com>',
      message: customMessage,
    }

    dispatch(forgotPass(model))
  }

  return (
    <div>
      <Box sx={sxBoxCreator(456)}>
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Forgot your password?</div>
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
              <div className={s.describe}>
                Enter your email address and we will send you further instructions
              </div>
              <ButtonComponent type="submit" sx={sxButtonMarginTopWidthCreator('60px')}>
                Send instructions
              </ButtonComponent>
            </form>

            <div className={s.already}>Did you remember your password?</div>
            <NavLink className={s.signIn} to={PATH.LOGIN}>
              Try logging in
            </NavLink>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
