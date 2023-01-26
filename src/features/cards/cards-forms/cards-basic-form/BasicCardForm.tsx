import React, { FC, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'

import { ButtonComponent, sxButtonColorCreator } from '../../../../common'
import { buttonBlue } from '../../../../common/constants/theme'

import s from './BasicCardForm.module.css'

export type NewCardType = {
  answer: string
  question: string
}

type BasicCardModalPropsType = {
  buttonText: string
  onSubmit: (data: NewCardType) => void
  disabled: boolean
  question?: string
  answer?: string
  handleSubmit: UseFormHandleSubmit<NewCardType>
  register: UseFormRegister<NewCardType>
  errors: Partial<FieldErrorsImpl<{ answer: string; question: string }>>
  reset: UseFormReset<NewCardType>
}
export const BasicCardForm: FC<BasicCardModalPropsType> = ({
  onSubmit,
  disabled,
  buttonText,
  question,
  answer,
  handleSubmit,
  register,
  errors,
}) => {
  const [select, setSelect] = useState('text')
  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value)
  }

  return (
    <div className={s.contentBox}>
      <FormControl sx={{ minWidth: '347px' }} className={s.formSelect}>
        <div className={s.selectName}>Choose a question format</div>
        <Select value={select} onChange={handleChange} displayEmpty size="small">
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'image'}>Image</MenuItem>
        </Select>
      </FormControl>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formInput}>
        <TextField
          sx={{ m: 1, width: '347px' }}
          id="question"
          label="Question"
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
    </div>
  )
}
