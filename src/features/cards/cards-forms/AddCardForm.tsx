import { FC } from 'react'

import { createCard } from '../cardsSlice'

import { BasicCardForm, NewCardType } from './cards-basic-form/BasicCardForm'

import { createCardSchema } from 'common/constants/validators/validationSchemes'
import { useAuthForm } from 'common/hooks/useAuthForm'

type NewCardModalType = {
  closeModal: () => void
}

export const AddCardForm: FC<NewCardModalType> = ({ closeModal }) => {
  const { register, handleSubmit, errors, reset, dispatch, appStatus } =
    useAuthForm<NewCardType>(createCardSchema)

  const createNewCard = (data: NewCardType) => {
    dispatch(createCard({ ...data, grade: 0 }))
      .then(() => {
        closeModal()
        reset()
      })
      .catch(() => {})
  }

  return (
    <>
      <BasicCardForm
        buttonText={'Save'}
        onSubmit={createNewCard}
        disabled={appStatus === 'loading'}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}
        closeModal={closeModal}
      />
    </>
  )
}
