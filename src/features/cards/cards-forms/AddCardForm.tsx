import React, { FC } from 'react'

import { createCardSchema } from '../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../common/hooks/useAuthForm'
import { createCard } from '../cardsSlice'

import { BasicCardForm, NewCardType } from './cards-basic-form/BasicCardForm'

type NewCardModalType = {
  closeModal: () => void
}

export const AddCardForm: FC<NewCardModalType> = ({ closeModal }) => {
  const { register, handleSubmit, errors, reset, dispatch, appStatus } =
    useAuthForm<NewCardType>(createCardSchema)

  const onSubmit = (data: NewCardType) => {
    const payload = {
      question: data.question,
      answer: data.answer,
      grade: 0,
    }

    dispatch(createCard(payload)).then(() => {
      closeModal()
      reset()
    })
  }

  return (
    <>
      <BasicCardForm
        buttonText={'Save'}
        onSubmit={onSubmit}
        disabled={appStatus === 'loading'}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}
      />
    </>
  )
}
