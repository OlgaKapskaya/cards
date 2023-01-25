import React, { FC } from 'react'

import deleteIcon from '../../../../assets/img/delete.svg'
import {
  buttonRed,
  buttonWhite,
  sxButtonColorCreator,
  ActionButton,
  ButtonComponent,
} from '../../../../common'
import { deleteCard } from '../../cardsSlice'
import { BoxCardModal } from '../cards-basic-modal/BoxCardModal'
import { useCardModal } from '../hooks/useCardModal'

import s from './DeleteCardModal.module.css'

type DeleteModalPropsType = {
  id: string
  name: string
  disabled: boolean
}

export const DeleteCardModal: FC<DeleteModalPropsType> = ({ id, disabled, name }) => {
  const { open, handleOpen, handleClose, dispatch } = useCardModal()

  const handleCloseReset = () => {
    handleClose()
  }
  const handleDeleteCard = () => {
    dispatch(deleteCard({ id })).then(() => {
      handleClose()
    })
  }

  return (
    <>
      <ActionButton icon={deleteIcon} hint="delete card" disabled={disabled} onClick={handleOpen} />
      <BoxCardModal title={'Delete card'} open={open} handleClose={handleClose}>
        <div className={s.contentBox}>
          <span className={s.description}>
            Do you really want to remove <b>{name}</b>?
          </span>
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
        </div>
      </BoxCardModal>
    </>
  )
}
