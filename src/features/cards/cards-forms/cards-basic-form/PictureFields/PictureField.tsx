import React, { ChangeEvent, FC, useState } from 'react'

import ReplayIcon from '@mui/icons-material/Replay'
import UploadIcon from '@mui/icons-material/Upload'
import IconButton from '@mui/material/IconButton'

import { NewCardType } from '../BasicCardForm'

import s from './PictureField.module.css'

import errorImg from 'assets/img/errorImg.png'
import { ButtonComponent, sxButtonColorCreator, useAppDispatch } from 'common'
import { buttonBlue } from 'common/constants/theme'
import { onChangeImg } from 'common/utils/convertToBase64'

type PictureFieldsPropsType = {
  onSubmit: (data: NewCardType) => void
  disabled: boolean
  closeModal: () => void
}

export const PictureFields: FC<PictureFieldsPropsType> = ({ disabled, onSubmit }) => {
  const dispatch = useAppDispatch()
  const [questionImg, setQuestionImg] = useState<string | undefined>(undefined)
  const [answerImg, setAnswerImg] = useState<string | undefined>(undefined)
  const [isQuestionImgBroken, setQuestionImgBroken] = useState(false)
  const [isAnswerImgBroken, setIsAnswerImgBroken] = useState(false)

  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true)
  }

  const onChangeQuestionImg = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeImg(e, dispatch, setQuestionImg)
    setQuestionImgBroken(false)
  }

  const onChangeAnswerImg = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeImg(e, dispatch, setAnswerImg)
    setIsAnswerImgBroken(false)
  }

  const onClickSaveImg = () => {
    onSubmit({ questionImg, answerImg })
  }

  return (
    <>
      <div className={s.uploadField}>
        <span className={s.text}>Question: </span>
        <div className={s.preview}>
          {questionImg && (
            <img
              alt="img"
              src={isQuestionImgBroken ? errorImg : questionImg}
              onError={() => errorHandler(setQuestionImgBroken)}
            />
          )}
        </div>
        <label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="questionImg"
            type="file"
            onChange={onChangeQuestionImg}
          />
          <IconButton color="primary" aria-label="questionImg" component="span">
            {questionImg ? <ReplayIcon /> : <UploadIcon />}
          </IconButton>
        </label>
      </div>
      <div className={s.uploadField}>
        <span className={s.text}>Answer: </span>
        <div className={s.preview}>
          {answerImg && (
            <img
              alt="img"
              src={isAnswerImgBroken ? errorImg : answerImg}
              onError={() => errorHandler(setIsAnswerImgBroken)}
            />
          )}
        </div>
        <IconButton color="primary" aria-label="answerImg" component="label">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="answerImg"
            type="file"
            onChange={onChangeAnswerImg}
          />
          {answerImg ? <ReplayIcon /> : <UploadIcon />}
        </IconButton>
      </div>
      <ButtonComponent
        sx={sxButtonColorCreator(buttonBlue, '113px', '30px', '30px')}
        disabled={disabled}
        onClick={onClickSaveImg}
      >
        Save
      </ButtonComponent>
    </>
  )
}
