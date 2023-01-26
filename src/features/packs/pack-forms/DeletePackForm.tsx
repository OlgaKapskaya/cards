import React, { FC } from 'react'

import Typography from '@mui/material/Typography'

import {
  appStatusSelector,
  ButtonComponent,
  buttonRed,
  buttonWhite,
  sxButtonColorCreator,
  useAppDispatch,
  useAppSelector,
} from '../../../common'
import s from '../modals/modals.module.css'
import { deletePack } from '../packsSlice'

type DeletePackFormPropsType = {
  pack_id: string
  name: string
  closeModal: () => void
}

export const DeletePackForm: FC<DeletePackFormPropsType> = ({ pack_id, name, closeModal }) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const deletePackHandler = () => {
    dispatch(deletePack({ id: pack_id }))
    closeModal()
  }

  const cancelHandler = () => {
    closeModal()
  }

  return (
    <div className={s.input}>
      <Typography sx={{ wordBreak: 'break-word' }}>
        Do you really want to remove <b>{name}</b>?
        <br />
        All cards will be deleted.
      </Typography>

      <div className={s.buttons}>
        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite)}
          onClick={cancelHandler}
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
  )
}
