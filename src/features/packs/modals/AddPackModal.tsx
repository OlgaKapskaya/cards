import React, { ChangeEvent, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { buttonWhite } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { sxButtonColorCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { createPack } from '../packsSlice'

import { BasicModal } from './BasicModal'
import s from './modal.module.css'

export const AddPackModal = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [packStatus, setPackStatus] = useState(false)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const addModalHandler = () => {
    setOpen(!open)
  }

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name, private: packStatus } }))
    setOpen(!open)
  }

  const packNameHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  return (
    <div>
      <ButtonComponent onClick={addModalHandler} disabled={loadingStatus === 'loading'}>
        Add New Pack
      </ButtonComponent>

      <BasicModal isOpen={open} setOpen={setOpen}>
        <div className={s.header}>
          <Typography variant="h6" component="h2">
            Add New Pack
          </Typography>

          <button type="button" onClick={addModalHandler}>
            <CloseIcon cursor="pointer" fontSize="small" />
          </button>
        </div>
        <div className={s.body}>
          <TextField
            label="Enter pack name"
            variant="standard"
            autoFocus
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
              onClick={addModalHandler}
              disabled={loadingStatus === 'loading'}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              sx={sxButtonColorCreator(['#1976d2', 'white'])}
              onClick={addNewPackHandler}
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
