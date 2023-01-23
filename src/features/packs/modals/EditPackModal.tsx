import React, { ChangeEvent, FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import edit from '../../../assets/img/edit-2.svg'
import { ActionButton } from '../../../common/components/buttons/action-button/ActionButton'
import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { buttonWhite } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { sxButtonColorCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { updatePack } from '../packsSlice'

import { BasicModal } from './BasicModal'
import s from './modal.module.css'

type EditPackModalPropsType = {
  id: string
  name: string
}

export const EditPackModal: FC<EditPackModalPropsType> = ({ id, name }) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [packStatus, setPackStatus] = useState(false)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')

  const editModalHandler = () => {
    setOpen(!open)
  }

  const editPackHandler = () => {
    dispatch(updatePack({ cardsPack: { _id: id, name: newName, private: packStatus } }))
    setOpen(!open)
  }

  const packNameHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewName(event.currentTarget.value)
  }

  return (
    <div>
      <ActionButton
        icon={edit}
        hint="update pack"
        disabled={loadingStatus === 'loading'}
        onClick={editModalHandler}
      />

      <BasicModal isOpen={open} setOpen={setOpen}>
        <div className={s.header}>
          <Typography variant="h6" component="h2">
            Edit Pack
          </Typography>

          <button type="button" onClick={editModalHandler}>
            <CloseIcon cursor="pointer" fontSize="small" />
          </button>
        </div>
        <div className={s.body}>
          <TextField
            label="Name pack"
            defaultValue={name}
            variant="standard"
            onChange={packNameHandler}
          />
          <div className={s.checkbox}>
            <FormControlLabel
              control={<Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />}
              label="Private pack"
            />
          </div>

          <div className={s.buttons}>
            <ButtonComponent
              sx={sxButtonColorCreator(buttonWhite)}
              onClick={editModalHandler}
              disabled={loadingStatus === 'loading'}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              sx={sxButtonColorCreator(['#1976d2', 'white'])}
              onClick={editPackHandler}
              disabled={loadingStatus === 'loading'}
            >
              Save
            </ButtonComponent>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
