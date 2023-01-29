import React, { FC } from 'react'

import TextField from '@mui/material/TextField'
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

import { NewCardType } from '../BasicCardForm'

import s from './TextFields.module.css'

import { ButtonComponent, sxButtonColorCreator } from 'common'
import { buttonBlue } from 'common/constants/theme'

type TextFieldsPropsType = {
  onSubmit: (data: NewCardType) => void
  handleSubmit: UseFormHandleSubmit<NewCardType>
  register: UseFormRegister<NewCardType>
  errors: Partial<FieldErrorsImpl<{ answer: string; question: string }>>
  question?: string
  answer?: string
  buttonText: string
  disabled: boolean
}
export const TextFields: FC<TextFieldsPropsType> = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  question,
  answer,
  buttonText,
  disabled,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.formInput}>
      <TextField
        sx={{ m: 1, width: '347px' }}
        id="question"
        label="Question"
        multiline
        variant="standard"
        {...register('question')}
        error={!!errors.question}
        helperText={errors.question?.message}
        defaultValue={question}
      />
      <TextField
        sx={{ m: 1, width: '347px' }}
        id="answer"
        label="Answer"
        multiline
        variant="standard"
        {...register('answer')}
        error={!!errors.answer}
        helperText={errors.answer?.message}
        defaultValue={answer}
      />
      <ButtonComponent
        type="submit"
        sx={sxButtonColorCreator(buttonBlue, '113px', '30px', '30px')}
        disabled={disabled}
      >
        {buttonText}
      </ButtonComponent>
    </form>
  )
}
