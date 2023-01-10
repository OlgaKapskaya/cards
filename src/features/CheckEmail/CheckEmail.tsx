import { FC } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'

import emailImg from '../../assets/img/emailImg.svg'
import { PATH } from '../../common/constants/path'

import s from './CheckEmail.module.css'

export const CheckEmail: FC = () => {
  const navigate = useNavigate()
  // заменить на реальный
  const email = 'example@mail.com'

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 413,
            height: 408,
            margin: '50px auto',
          },
        }}
      >
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Check Email</div>
            <img src={emailImg} alt="emailImg" />
            <p className={s.textInfo}>{`We’ve sent an Email with instructions to ${email}`}</p>
            <Button
              type="submit"
              className={s.btn}
              sx={{ borderRadius: '30px', mt: '35px' }}
              variant="contained"
              onClick={() => navigate(PATH.LOGIN)}
            >
              Back to login
            </Button>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
