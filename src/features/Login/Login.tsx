import { FC, useState, MouseEvent } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import s from './Login.module.css'

export const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          fontFamily: 'Montserrat, serif',
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
            <TextField
              className={s.email}
              sx={{ m: 1, width: '347px', fontFamily: 'Montserrat, serif' }}
              id="email"
              label="Email"
              variant="standard"
            />
            <FormControl className={s.password} sx={{ m: 1, width: '347px' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
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
            <FormControlLabel
              control={<Checkbox className={s.checkbox} defaultChecked />}
              label="Remember me"
            />
            <div>Forgot Password?</div>
            <Button variant="contained">Sign In</Button>
            <div>Already have an account?</div>
            <a href="#?">Sing Up</a>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
