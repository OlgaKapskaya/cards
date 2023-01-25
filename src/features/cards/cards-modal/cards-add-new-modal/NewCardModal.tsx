import React, { FC } from 'react'

import { ButtonComponent } from '../../../../common/components/buttons/button/ButtonComponent'
import { createCardSchema } from '../../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../../common/hooks/useAuthForm'
import { sxButtonMarginTopWidthCreator } from '../../../../common/utils/styles-utils/sxButtonCreators'
import { createCard } from '../../cardsSlice'
import { BasicCardModal, NewCardType } from '../cards-basic-modal/BasicCardModal'
import { useCardModal } from '../hooks/useCardModal'

type NewCardModalType = {
  disabled: boolean
}

export const NewCardModal: FC<NewCardModalType> = ({ disabled }) => {
  const { open, handleOpen, handleClose, dispatch } = useCardModal()
  const { register, handleSubmit, errors, reset } = useAuthForm<NewCardType>(createCardSchema)

  const handleAddNewCard = (data: NewCardType) => {
    const payload = {
      question: data.question,
      answer: data.answer,
      grade: Math.floor(Math.random() * 5),
    }

    dispatch(createCard(payload)).then(() => {
      handleClose()
      reset()
    })
  }

  return (
    <>
      <ButtonComponent
        sx={sxButtonMarginTopWidthCreator('0', '184px')}
        onClick={handleOpen}
        disabled={disabled}
      >
        Add new card
      </ButtonComponent>
      <BasicCardModal
        title={'Add card'}
        buttonText={'Add'}
        open={open}
        handleClose={handleClose}
        onSubmitAction={handleAddNewCard}
        disabled={disabled}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}
      />
    </>
  )
}
