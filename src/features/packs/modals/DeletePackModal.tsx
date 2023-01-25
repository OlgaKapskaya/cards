import React, { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import del from '../../../assets/img/trash.svg'
import {
  ActionButton,
  ButtonComponent,
  buttonRed,
  buttonWhite,
  useAppDispatch,
  useAppSelector,
  appStatusSelector,
  userIDSelector,
  sxButtonColorCreator,
} from '../../../common'
import { deletePack } from '../packsSlice'

import { BasicModal } from './BasicModal'
import s from './modals.module.css'

type DeletePackModalPropsType = {
  pack_id: string
  name: string
  user_id: string
}

export const DeletePackModal: FC<DeletePackModalPropsType> = ({ pack_id, name, user_id }) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()
  const profile_id = useAppSelector(userIDSelector)
  const isButtonDisabled = profile_id !== user_id

  const [open, setOpen] = useState<boolean>(false)

  const deleteModalHandler = () => {
    setOpen(!open)
  }

  const deletePackHandler = () => {
    dispatch(deletePack({ id: pack_id }))
    setOpen(!open)
  }

  return (
    <div className={isButtonDisabled ? s.disabled : ''}>
      <ActionButton
        icon={del}
        hint="delete pack"
        disabled={isButtonDisabled}
        onClick={deleteModalHandler}
      />

      <BasicModal isOpen={open} setOpen={setOpen}>
        <div className={s.header}>
          <Typography variant="h6" component="h2">
            Delete Pack
          </Typography>

          <button type="button" onClick={deleteModalHandler}>
            <CloseIcon cursor="pointer" fontSize="small" />
          </button>
        </div>
        <div className={s.input}>
          <Typography>
            Do you really want to remove <span style={{ fontWeight: 'bold' }}>{name}</span>? All
            cards will be deleted.
          </Typography>

          <div className={s.buttons}>
            <ButtonComponent
              sx={sxButtonColorCreator(buttonWhite)}
              onClick={deleteModalHandler}
              disabled={loadingStatus === 'loading'}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              sx={sxButtonColorCreator(buttonRed)}
              onClick={deletePackHandler}
              disabled={loadingStatus === 'loading'}
            >
              Delete
            </ButtonComponent>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
