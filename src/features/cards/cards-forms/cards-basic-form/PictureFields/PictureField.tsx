import React, { ChangeEvent, FC, useState } from 'react'

import ReplayIcon from '@mui/icons-material/Replay'
import UploadIcon from '@mui/icons-material/Upload'
import IconButton from '@mui/material/IconButton'

import { ButtonComponent, convertToBase64, sxButtonColorCreator } from '../../../../../common'
import { buttonBlue } from '../../../../../common/constants/theme'
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

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>, setImg: (img: string) => void) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertToBase64(file, (file64: string) => {
          setImg(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

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
            onChange={e => onChangeImg(e, setQuestionImg)}
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
            onChange={e => onChangeImg(e, setAnswerImg)}
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
