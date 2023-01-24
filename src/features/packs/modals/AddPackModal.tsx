import React, { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { buttonWhite } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { sxButtonColorCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { createPack } from '../packsSlice'

import { BasicModal } from './BasicModal'
import s from './modals.module.css'

type IFormInput = {
  name: string
  private: boolean
}

export const AddPackModal = () => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [packStatus, setPackStatus] = useState(false)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const { register, handleSubmit, reset } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(createPack({ cardsPack: { name: data.name, private: data.private } }))
    setOpen(!open)
    reset()
  }

  const addModalHandler = () => {
    setOpen(!open)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input}>
            <TextField label="Enter pack name" variant="standard" autoFocus {...register('name')} />
            <div className={s.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />
                }
                label={'Private pack'}
                {...register('private')}
              />
            </div>

            <div className={s.buttons}>
              <ButtonComponent sx={sxButtonColorCreator(buttonWhite)} onClick={addModalHandler}>
                Cancel
              </ButtonComponent>
              <ButtonComponent type="submit" sx={sxButtonColorCreator(['#1976d2', 'white'])}>
                Save
              </ButtonComponent>
            </div>
          </div>
        </form>
      </BasicModal>
    </div>
  )
}
