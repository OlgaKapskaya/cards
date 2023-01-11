import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../common/constants/path'
import { forgotValidationSchema } from '../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../common/hooks/useAuthForm'
import { forgotPass } from '../Login/authSlice'

import s from './PasswordRecovery.module.css'

type IFormInput = {
  email: string
}

const customMessage = `
                  <div style='background-color: indianred; padding: 15px'>
                      password recovery link: 
                    <a href='http://localhost:3000/#/set-new-password/$token$'>
                      link
                    </a>
                  </div>`

export const PasswordRecovery: FC = () => {
  const { dispatch, register, handleSubmit, errors } =
    useAuthForm<IFormInput>(forgotValidationSchema)

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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 413,
            height: 456,
            margin: '50px auto',
          },
        }}
      >
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
              <Button
                type="submit"
                className={s.btn}
                sx={{ borderRadius: '30px', mt: '60px' }}
                variant="contained"
              >
                Send instructions
              </Button>
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
