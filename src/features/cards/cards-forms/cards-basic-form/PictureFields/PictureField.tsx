import React, { FC, useState } from 'react'

import ReplayIcon from '@mui/icons-material/Replay'
import UploadIcon from '@mui/icons-material/Upload'
import IconButton from '@mui/material/IconButton'

import { ButtonComponent, sxButtonColorCreator, useAppDispatch } from '../../../../../common'
import { buttonBlue } from '../../../../../common/constants/theme'
import { onChangeImg } from '../../../../../common/utils/convertToBase64'
import { NewCardType } from '../BasicCardForm'

import s from './PictureField.module.css'

type PictureFieldsPropsType = {
  onSubmit: (data: NewCardType) => void
  disabled: boolean
  closeModal: () => void
}

export const PictureFields: FC<PictureFieldsPropsType> = ({ disabled, onSubmit }) => {
  const [questionImg, setQuestionImg] = useState<string | undefined>(undefined)
  const [answerImg, setAnswerImg] = useState<string | undefined>(undefined)
  const dispatch = useAppDispatch()

  const onClickSaveImg = () => {
    onSubmit({ questionImg, answerImg })
  }

  return (
    <>
      <div className={s.uploadField}>
        <span className={s.text}>Question: </span>
        <div className={s.preview}>{questionImg && <img alt="img" src={questionImg} />}</div>
        <label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="questionImg"
            type="file"
            onChange={e => onChangeImg(e, dispatch, setQuestionImg)}
          />
          <IconButton color="primary" aria-label="questionImg" component="span">
            {questionImg ? <ReplayIcon /> : <UploadIcon />}
          </IconButton>
        </label>
      </div>
      <div className={s.uploadField}>
        <span className={s.text}>Answer: </span>
        <div className={s.preview}>{answerImg && <img alt="img" src={answerImg} />}</div>
        <IconButton color="primary" aria-label="answerImg" component="label">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="answerImg"
            type="file"
            onChange={e => onChangeImg(e, dispatch, setAnswerImg)}
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
