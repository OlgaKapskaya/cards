import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'

import emailImg from '../../assets/img/emailImg.svg'
import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
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
            <ButtonComponent
              type="submit"
              className={s.btn}
              sx={{ mt: '35px' }}
              onClick={() => navigate(PATH.LOGIN)}
            >
              Back to login
            </ButtonComponent>
          </div>
        </Paper>
      </Box>
    </div>
  )
}
