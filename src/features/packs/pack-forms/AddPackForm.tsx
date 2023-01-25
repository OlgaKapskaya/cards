import React, { FC, useState } from 'react'

import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ButtonComponent, buttonWhite, sxButtonColorCreator, useAppDispatch } from '../../../common'
import s from '../modals/modals.module.css'
import { createPack } from '../packsSlice'

export type AddFormType = {
  name: string
  private: boolean
}
type AddPackFormPropsType = {
  closeModal: () => void
}

export const AddPackForm: FC<AddPackFormPropsType> = ({ closeModal }) => {
  const { register, handleSubmit, reset } = useForm<AddFormType>()

  const [packStatus, setPackStatus] = useState(false)
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<AddFormType> = data => {
    dispatch(createPack({ cardsPack: { name: data.name, private: data.private } }))
    closeModal()
    reset()
  }

  const addModalHandler = () => {
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.input}>
        <TextField label="Enter pack name" variant="standard" autoFocus {...register('name')} />
        <div className={s.checkbox}>
          <FormControlLabel
            control={<Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />}
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
  )
}
