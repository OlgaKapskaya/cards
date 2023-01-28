import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { useNavigate, useParams } from 'react-router-dom'

import s from './CheckEmail.module.css'

import emailImg from 'assets/img/emailImg.svg'
import { ButtonComponent, sxBoxCreator, sxButtonMarginTopWidthCreator } from 'common'
import { PATH } from 'common/constants/path'

export const CheckEmail: FC = () => {
  const navigate = useNavigate()

  const { email } = useParams<{ email: string }>()

  return (
    <div>
      <Box sx={sxBoxCreator(408)}>
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Check Email</div>
            <img src={emailImg} alt="emailImg" />
            <p className={s.textInfo}>{`We’ve sent an Email with instructions to ${email}`}</p>
            <ButtonComponent
              type="submit"
              sx={sxButtonMarginTopWidthCreator('35px')}
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
