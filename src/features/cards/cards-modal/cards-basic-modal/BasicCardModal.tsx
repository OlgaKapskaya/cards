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

import { sxButtonColorCreator, buttonWhite, ButtonComponent } from '../../../../common'

import s from './BasicCardModal.module.css'
import { BoxCardModal } from './BoxCardModal'

export type NewCardType = {
  answer: string
  question: string
}

type BasicCardModalPropsType = {
  title: string
  buttonText: string
  open: boolean
  handleClose: () => void
  onSubmitAction: (data: NewCardType) => void
  disabled: boolean
  question?: string
  answer?: string
  handleSubmit: UseFormHandleSubmit<NewCardType>
  register: UseFormRegister<NewCardType>
  errors: Partial<FieldErrorsImpl<{ answer: string; question: string }>>
  reset: UseFormReset<NewCardType>
}
export const BasicCardModal: FC<BasicCardModalPropsType> = ({
  open,
  handleClose,
  onSubmitAction,
  disabled,
  title,
  buttonText,
  question,
  answer,
  handleSubmit,
  register,
  errors,
  reset,
}) => {
  // -- для селекта
  const [select, setSelect] = useState('text')
  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value)
  }

  return (
    <BoxCardModal title={title} open={open} handleClose={handleClose} reset={reset}>
      <>
        <FormControl sx={{ minWidth: '347px' }} className={s.formSelect}>
          <div className={s.selectName}>Choose a question format</div>
          <Select value={select} onChange={handleChange} displayEmpty size="small">
            <MenuItem value={'text'}>Text</MenuItem>
            <MenuItem value={'image'}>Image</MenuItem>
          </Select>
        </FormControl>
        <form onSubmit={handleSubmit(onSubmitAction)} className={s.formInput}>
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
            sx={sxButtonColorCreator(buttonWhite, '113px', '30px', '30px')}
            disabled={disabled}
          >
            {buttonText}
          </ButtonComponent>
        </form>
      </>
    </BoxCardModal>
  )
}
