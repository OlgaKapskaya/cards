import React, { FC } from 'react'

import editIcon from '../../../../assets/img/edit.svg'
import { ActionButton } from '../../../../common/components/buttons/action-button/ActionButton'
import { updateCard } from '../../cardsSlice'
import { BasicCardModal, NewCardType } from '../cards-basic-modal/BasicCardModal'
import { useCardModal } from '../hooks/useCardModal'

type EditCardModalPropsType = {
  id: string
  disabled: boolean
}
export const EditCardModal: FC<EditCardModalPropsType> = ({ id, disabled }) => {
  const { open, handleOpen, handleClose, dispatch } = useCardModal()

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
      />
    </>
  )
}
