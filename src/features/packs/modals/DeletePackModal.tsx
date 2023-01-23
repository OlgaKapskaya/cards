import React, { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

import del from '../../../assets/img/trash.svg'
import { ActionButton } from '../../../common/components/buttons/action-button/ActionButton'
import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { buttonRed, buttonWhite } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { sxButtonColorCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { deletePack } from '../packsSlice'

import { BasicModal } from './BasicModal'
import s from './modal.module.css'

type DeletePackModalPropsType = {
  id: string
  name: string
}

export const DeletePackModal: FC<DeletePackModalPropsType> = ({ id, name }) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState<boolean>(false)

  const deleteModalHandler = () => {
    setOpen(!open)
  }

  const deletePackHandler = () => {
    dispatch(deletePack({ id }))
    setOpen(!open)
  }

  return (
    <div>
      <ActionButton
        icon={del}
        hint="delete pack"
        disabled={loadingStatus === 'loading'}
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
        <div className={s.body}>
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
