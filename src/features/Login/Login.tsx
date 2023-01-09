import { FC, useState, MouseEvent, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { PATH } from '../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'

import { LoginRequestType } from './authAPI'
import { login } from './authSlice'
import s from './Login.module.css'

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

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()

export const Login: FC = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => {
    // не зачищает check
    // после зачистки не уходит фокус с password
    // reset()
    console.log('onSubmit: ', data)
    dispatch(login(data))
  }

  useEffect(() => {
    isLoggedIn && navigate(PATH.PROFILE)
  }, [isLoggedIn])

  return (
    <div>
      <div>{isLoggedIn ? 'login' : 'logut'}</div>
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
              <div className={s.title}>Sign in</div>
              <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <TextField
                  className={s.email}
                  sx={{ m: 1, width: '347px' }}
                  id="email"
                  label="Email"
                  variant="standard"
                  {...register('email', { required: true, maxLength: 10 })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <FormControl
                  className={s.password}
                  sx={{ m: 1, width: '347px' }}
                  variant="standard"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: true, maxLength: 80 })}
                    error={!!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && <span className={s.error}>{errors.password?.message}</span>}
                </FormControl>
                <div className={s.checkbox}>
                  <Checkbox id="rememberMe" {...register('rememberMe')} />
                  <span>Remember me</span>
                </div>
                <NavLink className={s.forgot} to={PATH.PASSWORD_RECOVERY}>
                  Forgot Password?
                </NavLink>
                <Button
                  type="submit"
                  className={s.btn}
                  sx={{ borderRadius: '30px', mt: '60px' }}
                  variant="contained"
                >
                  Sign In
                </Button>
              </form>

              <div className={s.already}>Already have an account?</div>
              <NavLink className={s.singUp} to={PATH.REGISTRATION}>
                Sing Up
              </NavLink>
            </div>
          </Paper>
        </Box>
      </ThemeProvider>
    </div>
  )
}
