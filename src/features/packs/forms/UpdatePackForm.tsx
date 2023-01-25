import React, { FC, useState } from 'react'

import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  appStatusSelector,
  ButtonComponent,
  buttonWhite,
  sxButtonColorCreator,
  useAppDispatch,
  useAppSelector,
} from '../../../common'
import s from '../modals/modals.module.css'
import { updatePack } from '../packsSlice'

import { AddFormType } from './AddPackForm'

type UpdatePackFormPropsType = {
  pack_id: string
  name: string
  closeModal: () => void
}

export const UpdatePackForm: FC<UpdatePackFormPropsType> = ({ pack_id, name, closeModal }) => {
  const [packStatus, setPackStatus] = useState(false)
  const dispatch = useAppDispatch()

  const loadingStatus = useAppSelector(appStatusSelector)

  const { register, handleSubmit, reset } = useForm<AddFormType>()

  const onSubmit: SubmitHandler<AddFormType> = data => {
    if (name !== data.name) {
      dispatch(updatePack({ cardsPack: { _id: pack_id, name: data.name, private: data.private } }))
    }
    closeModal()
    reset()
  }

  const cancelHandler = () => {
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.input}>
        <TextField label="Name pack" defaultValue={name} variant="standard" {...register('name')} />
        <div className={s.checkbox}>
          <FormControlLabel
            control={<Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />}
            label="Private pack"
            {...register('private')}
          />
        </div>

        <div className={s.buttons}>
          <ButtonComponent
            sx={sxButtonColorCreator(buttonWhite)}
            onClick={cancelHandler}
            disabled={loadingStatus === 'loading'}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            type="submit"
            sx={sxButtonColorCreator(['#1976d2', 'white'])}
            disabled={loadingStatus === 'loading'}
          >
            Save
          </ButtonComponent>
        </div>
      </div>
    </form>
  )
}
