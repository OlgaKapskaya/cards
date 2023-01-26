import React, { FC } from 'react'

import {
  ButtonComponent,
  buttonRed,
  buttonWhite,
  sxButtonColorCreator,
  useAppDispatch,
} from '../../../common'
import { deleteCard } from '../cardsSlice'

import s from './DeleteCardForm.module.css'

type DeleteModalPropsType = {
  id: string
  name: string
  disabled: boolean
  closeModal: () => void
}

export const DeleteCardForm: FC<DeleteModalPropsType> = ({ id, disabled, name, closeModal }) => {
  const dispatch = useAppDispatch()

  const handleCloseReset = () => {
    closeModal()
  }
  const handleDeleteCard = () => {
    dispatch(deleteCard({ id })).then(() => {
      closeModal()
    })
  }

  return (
    <>
      <div className={s.description}>
        Do you really want to remove <b>{name}</b>?
      </div>
      <div className={s.buttonBox}>
        <ButtonComponent
          onClick={handleCloseReset}
          sx={sxButtonColorCreator(buttonWhite, '113px', '30px', '30px')}
          disabled={disabled}
        >
          Cancel
        </ButtonComponent>
        <ButtonComponent
          onClick={handleDeleteCard}
          sx={sxButtonColorCreator(buttonRed, '113px', '30px', '30px')}
          disabled={disabled}
        >
          Delete
        </ButtonComponent>
      </div>
    </>
  )
}
