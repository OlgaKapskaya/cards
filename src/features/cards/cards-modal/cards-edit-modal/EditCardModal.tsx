import React, { FC } from 'react'

import editIcon from '../../../../assets/img/edit.svg'
import { ActionButton } from '../../../../common'
import { createCardSchema } from '../../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../../common/hooks/useAuthForm'
import { updateCard } from '../../cardsSlice'
import { BasicCardModal, NewCardType } from '../cards-basic-modal/BasicCardModal'
import { useCardModal } from '../hooks/useCardModal'

type EditCardModalPropsType = {
  id: string
  disabled: boolean
  question: string
  answer: string
}
export const EditCardModal: FC<EditCardModalPropsType> = ({ id, disabled, question, answer }) => {
  const { open, handleOpen, handleClose, dispatch } = useCardModal()
  // -- для полей ввода
  const { register, handleSubmit, errors, reset } = useAuthForm<NewCardType>(createCardSchema)

  const handleUpdateCard = (data: NewCardType) => {
    const payload = {
      card: {
        _id: id,
        answer: data.answer,
        question: data.answer,
      },
    }

    dispatch(updateCard(payload)).then(() => {
      handleClose()
    })
  }

  return (
    <>
      <ActionButton icon={editIcon} hint="update card" disabled={disabled} onClick={handleOpen} />
      <BasicCardModal
        title={'Edit card'}
        buttonText={'Save'}
        open={open}
        handleClose={handleClose}
        onSubmitAction={handleUpdateCard}
        disabled={disabled}
        question={question}
        answer={answer}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}
      />
    </>
  )
}
