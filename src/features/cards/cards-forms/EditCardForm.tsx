import React, { FC } from 'react'

import { updateCard } from '../cardsSlice'

import { BasicCardForm, NewCardType } from './cards-basic-form/BasicCardForm'

import { createCardSchema } from 'common/constants/validators/validationSchemes'
import { useAuthForm } from 'common/hooks/useAuthForm'

type EditCardModalPropsType = {
  id: string
  question: string
  answer: string
  closeModal: () => void
}
export const EditCardForm: FC<EditCardModalPropsType> = ({ id, question, answer, closeModal }) => {
  const { register, handleSubmit, errors, reset, dispatch, appStatus } =
    useAuthForm<NewCardType>(createCardSchema)

  const handleEditCard = (data: NewCardType) => {
    const payload = {
      card: {
        _id: id,
        answer: data.answer,
        question: data.answer,
        questionImg: data.questionImg || 'noImg',
        answerImg: data.answerImg || 'noImg',
      },
    }

    dispatch(updateCard(payload))
      .then(() => {
        closeModal()
      })
      .catch(() => {})
  }

  return (
    <BasicCardForm
      buttonText={'Save'}
      onSubmit={handleEditCard}
      disabled={appStatus === 'loading'}
      question={question}
      answer={answer}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      reset={reset}
      closeModal={closeModal}
    />
  )
}
