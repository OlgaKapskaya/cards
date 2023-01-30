import { ChangeEvent, FC, useState } from 'react'

import { FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'

import { onChangeImg } from '../../../common/utils/convertToBase64'
import { createPack } from '../packsSlice'

import s from './PaksFoms.module.css'

import { ButtonComponent, sxButtonColorCreator } from 'common'
import { buttonBlue } from 'common/constants/theme'
import { addPackSchema } from 'common/constants/validators/validationSchemes'
import { useAuthForm } from 'common/hooks/useAuthForm'

export type AddFormType = {
  name: string
  private: boolean
}
type AddPackFormPropsType = {
  closeModal: () => void
}

export const AddPackForm: FC<AddPackFormPropsType> = ({ closeModal }) => {
  const { register, handleSubmit, reset, dispatch, errors, appStatus } =
    useAuthForm<AddFormType>(addPackSchema)
  const [packStatus, setPackStatus] = useState(false)

  const [coverImg, setCoverImg] = useState<string | undefined>(undefined)

  const onChangeCoverInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeImg(e, dispatch, setCoverImg)
  }

  const onSubmit: SubmitHandler<AddFormType> = data => {
    dispatch(
      createPack({ cardsPack: { name: data.name, private: data.private, deckCover: coverImg } })
    )
    closeModal()
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.cover}>
        <Button variant="contained" component="label">
          Upload cover
          <input type="file" onChange={onChangeCoverInput} style={{ display: 'none' }} />
        </Button>
      </div>
      <div className={s.input}>
        <TextField
          label="Enter pack name"
          multiline
          variant="standard"
          autoFocus
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <div className={s.checkbox}>
          <FormControlLabel
            control={<Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />}
            label={'Private pack'}
            {...register('private')}
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
