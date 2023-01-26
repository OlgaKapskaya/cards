import { FC } from 'react'

import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'

import { ButtonComponent, buttonWhite, sxButtonColorCreator } from '../../../common'
import { updatePackSchema } from '../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../common/hooks/useAuthForm'
import s from '../modals/modals.module.css'
import { updatePack } from '../packsSlice'

import { AddFormType } from './AddPackForm'

type UpdatePackFormPropsType = {
  pack_id: string
  name: string
  closeModal: () => void
  onPrivate: boolean
}

export const UpdatePackForm: FC<UpdatePackFormPropsType> = ({
  pack_id,
  name,
  onPrivate,
  closeModal,
}) => {
  const { register, handleSubmit, reset, appStatus, dispatch, errors } =
    useAuthForm<AddFormType>(updatePackSchema)

  const onSubmit: SubmitHandler<AddFormType> = data => {
    if (name !== data.name || onPrivate !== data.private) {
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
        <TextField
          label="Name pack"
          defaultValue={name}
          variant="standard"
          {...register('name')}
          helperText={errors.name && errors.name?.message}
          error={!!errors.name}
        />
        <div className={s.checkbox}>
          <FormControlLabel
            control={<Checkbox defaultChecked={onPrivate} {...register('private')} />}
            label="Private pack"
          />
        </div>

        <div className={s.buttons}>
          <ButtonComponent
            sx={sxButtonColorCreator(buttonWhite)}
            onClick={cancelHandler}
            disabled={appStatus === 'loading'}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            type="submit"
            sx={sxButtonColorCreator(['#1976d2', 'white'])}
            disabled={appStatus === 'loading'}
          >
            Save
          </ButtonComponent>
        </div>
      </div>
    </form>
  )
}
