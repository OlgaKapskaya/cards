import React, { FC, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'

import s from './BasicCardForm.module.css'
import { PictureFields } from './PictureFields/PictureField'
import { TextFields } from './TextFields/TextFields'

export type NewCardType = {
  answer?: string
  question?: string
  questionImg?: string
  answerImg?: string
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
  closeModal: () => void
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
  closeModal,
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
          <MenuItem value={'picture'}>Picture</MenuItem>
        </Select>
      </FormControl>

      {select === 'text' && (
        <TextFields
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          question={question}
          answer={answer}
          buttonText={buttonText}
          disabled={disabled}
        />
      )}

      {select === 'picture' && (
        <PictureFields onSubmit={onSubmit} disabled={disabled} closeModal={closeModal} />
      )}
    </div>
  )
}
