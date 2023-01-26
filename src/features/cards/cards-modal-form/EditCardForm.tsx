import React, { FC } from 'react'

import { createCardSchema } from '../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../common/hooks/useAuthForm'
import { updateCard } from '../cardsSlice'

import { BasicCardForm, NewCardType } from './cards-basic-form/BasicCardForm'

type EditCardModalPropsType = {
  id: string
  question: string
  answer: string
  closeModal: () => void
}
export const EditCardForm: FC<EditCardModalPropsType> = ({ id, question, answer, closeModal }) => {
  const { register, handleSubmit, errors, reset, dispatch, appStatus } =
    useAuthForm<NewCardType>(createCardSchema)

  const handleUpdateCard = (data: NewCardType) => {
    const payload = {
      card: {
        _id: id,
        answer: data.answer,
        question: data.answer,
      },
    }

    dispatch(updateCard(payload)).then(() => {
      closeModal()
    })
  }

  return (
    <BasicCardForm
      buttonText={'Save'}
      onSubmit={handleUpdateCard}
      disabled={appStatus === 'loading'}
      question={question}
      answer={answer}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      reset={reset}
    />
  )
}
