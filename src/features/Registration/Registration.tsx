import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  createTheme,
  CssBaseline,
  IconButton,
  InputAdornment,
  InputLabel,
  Snackbar,
  ThemeProvider,
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import * as yup from 'yup'

import { PATH } from '../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../common/hooks/react-redux-hooks'

import s from './Registration.module.css'
import { signUp } from './registrationThunk'
import { signUpStatusCreator } from './signUpSlice'

type IFormInput = {
  email: string
  password: string
  confirmPassword: string
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
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: 'onTouched' })
  const onSubmit: SubmitHandler<IFormInput> = data => dispatch(signUp(data))
  const dispatch = useAppDispatch()
  const signUpStatus = useAppSelector(state => state.signUp.isRegistered)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(signUpStatusCreator(false))
  }

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
              <div className={s.title}>Sign Up</div>
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
                <FormControl
                  className={s.password}
                  sx={{ m: 1, width: '347px' }}
                  variant="standard"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required!' })}
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
                <FormControl
                  variant="standard"
                  className={s.password}
                  sx={{ m: 1, width: '347px' }}
                >
                  <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                  <Input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
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
                    {...register('confirmPassword', {
                      required: 'Please confirm password!',
                    })}
                  />
                </FormControl>
                {errors.confirmPassword && (
                  <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
                )}

                <Button
                  type="submit"
                  className={s.btn}
                  sx={{ borderRadius: '30px', mt: '60px' }}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </form>

              <div className={s.already}>Already have an account?</div>
              <NavLink className={s.signIn} to={PATH.LOGIN}>
                Sign In
              </NavLink>
            </div>
          </Paper>
        </Box>
        {signUpStatus && (
          <Snackbar open={signUpStatus} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: '#2e7d32',
                color: 'white',
                '& .MuiAlert-icon': {
                  color: 'white',
                  marginTop: '18px',
                  marginRight: '12px',
                  padding: '3px 0',
                },
              }}
            >
              {<p>You are successfully registered</p>}
            </Alert>
          </Snackbar>
        )}
      </ThemeProvider>
    </div>
  )
}

// <div className={s.container}>
//   <div className={s.formBlock}>
//     <h2 className={s.header}>Sign Up</h2>
//     <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
//       {/*Email field*/}
//       <TextField
//           required
//           id="standard-required"
//           label="Email"
//           variant="standard"
//           {...register('email')}
//       />
//       {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
//       {/*Password field*/}
//       <FormControl variant="standard">
//         <InputLabel htmlFor="standard-adornment-password-required">Password</InputLabel>
//         <Input
//             id="standard-adornment-password-required"
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             {...register('password', { required: 'Password is required!' })}
//         />
//       </FormControl>
//       {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
//       {/*Confirm password field*/}
//       <FormControl variant="standard">
//         <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
//         <Input
//             id="standard-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             {...register('confirmPassword', {
//               required: 'Please confirm password!',
//             })}
//         />
//       </FormControl>
//       {errors.confirmPassword && (
//           <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
//       )}
//       {/*Button*/}
//       <Button type={'submit'} variant={'contained'} color={'primary'}>
//         Sign Up
//       </Button>
//     </form>
//   </div>
// </div>
