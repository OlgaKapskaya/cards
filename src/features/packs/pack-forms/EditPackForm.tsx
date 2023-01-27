import { FC } from 'react'

import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'

import { ButtonComponent, sxButtonColorCreator } from '../../../common'
import { buttonBlue } from '../../../common/constants/theme'
import { updatePackSchema } from '../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../common/hooks/useAuthForm'
import { UpdatePackPayloadType } from '../packsAPI'

import { AddFormType } from './AddPackForm'
import s from './PaksFoms.module.css'

type UpdatePackFormPropsType = {
  pack_id: string
  name: string
  closeModal: (data: UpdatePackPayloadType) => void
  onPrivate?: boolean
}

export const EditPackForm: FC<UpdatePackFormPropsType> = ({
  pack_id,
  name,
  closeModal,
  onPrivate,
}) => {
  const { register, handleSubmit, appStatus, errors } = useAuthForm<AddFormType>(updatePackSchema)

  const onSubmit: SubmitHandler<AddFormType> = data => {
    closeModal({ cardsPack: { _id: pack_id, name: data.name, private: data.private } })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.input}>
        <TextField
          label="Name pack"
          defaultValue={name}
          variant="standard"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <div className={s.checkbox}>
          <FormControlLabel
            control={<Checkbox defaultChecked={onPrivate} {...register('private')} />}
            label="Private pack"
          />
        </div>

        <div className={s.buttons}>
          <ButtonComponent
            type="submit"
            sx={sxButtonColorCreator(buttonBlue, '113px', '10px', '30px')}
            disabled={appStatus === 'loading'}
          >
            Save
          </ButtonComponent>
        </div>
      </div>
    </form>
  )
}
