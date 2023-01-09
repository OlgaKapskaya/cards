import { FC, useState, MouseEvent } from 'react'

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
// import * as yup from 'yup'

import s from './Login.module.css'

type Inputs = {
  email: string
  password: string
  check: boolean
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

// const schema = yup
//   .object({
//     email: yup.string().email().required(),
//     password: yup.string().required(),
//   })
//   .required()

export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data))
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
              <div className={s.title}>Sign in</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  className={s.email}
                  sx={{ m: 1, width: '347px' }}
                  id="email"
                  label="Email"
                  variant="standard"
                  {...register('email', { required: true, maxLength: 10 })}
                  error={!!errors.email}
                  helperText={'ERROR'}
                />
                <span>span: {errors.email?.message}</span>
                <FormControl
                  className={s.password}
                  sx={{ m: 1, width: '347px' }}
                  variant="standard"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    {...register('password', { required: true, maxLength: 80 })}
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
                  />
                </FormControl>
                <div className={s.checkbox}>
                  <Checkbox id="check" {...register('check')} />
                  <span>Remember me</span>
                </div>
                <div className={s.forgot}>Forgot Password?</div>
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
              <a href="#?">Sing Up</a>
            </div>
          </Paper>
        </Box>
      </ThemeProvider>
    </div>
  )
}
