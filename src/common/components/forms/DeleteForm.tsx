import React, { FC } from 'react'

import { ButtonComponent, buttonRed, sxButtonColorCreator } from '../../index'

import s from './DeleteForm.module.css'

type DeleteModalPropsType = {
  name: string
  disabled: boolean
  closeModal: () => void
}

export const DeleteForm: FC<DeleteModalPropsType> = ({ disabled, name, closeModal }) => {
  return (
    <div className={s.deleteModalBox}>
      <div className={s.description}>
        Do you really want to remove <b>{name}</b>?
      </div>

      <ButtonComponent
        onClick={closeModal}
        sx={sxButtonColorCreator(buttonRed, '113px', '30px', '30px')}
        disabled={disabled}
      >
        Delete
      </ButtonComponent>
    </div>
  )
}
