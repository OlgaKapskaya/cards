import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../common/constants/path'

import { usePasswordRecovery } from './hooks/usePasswordRecovery'
import s from './PasswordRecovery.module.css'

export const PasswordRecovery: FC = () => {
  const { register, handleSubmit, errors, onSubmit } = usePasswordRecovery()

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
