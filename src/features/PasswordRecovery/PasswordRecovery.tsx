import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { PATH } from '../../common/constants/path'
import { useAppDispatch } from '../../common/hooks/react-redux-hooks'

import s from './PasswordRecovery.module.css'

type IFormInput = {
  email: string
}

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})

const schema = yup.object({
  email: yup.string().email(),
})

export const PasswordRecovery: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onTouched' })
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 413,
              height: 552,
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
      </ThemeProvider>
    </div>
  )
}
