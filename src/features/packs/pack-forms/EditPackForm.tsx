import React, { ChangeEvent, FC, useState } from 'react'

import { FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { SubmitHandler } from 'react-hook-form'

import { setAppMessage, setAppStatus } from '../../../app/appSlice'
import errorImg from '../../../assets/img/errorImg.png'
import { onChangeImg } from '../../../common/utils/convertToBase64'
import { UpdatePackPayloadType } from '../packsAPI'

import { AddFormType } from './AddPackForm'
import s from './PacksFoms.module.css'

import { ButtonComponent, sxButtonColorCreator } from 'common'
import { buttonBlue } from 'common/constants/theme'
import { updatePackSchema } from 'common/constants/validators/validationSchemes'
import { useAuthForm } from 'common/hooks/useAuthForm'

type UpdatePackFormPropsType = {
  pack_id: string
  name: string
  closeModal: (data: UpdatePackPayloadType) => void
  onPrivate?: boolean
  deckCover?: string
}

export const EditPackForm: FC<UpdatePackFormPropsType> = ({
  pack_id,
  name,
  closeModal,
  onPrivate,
  deckCover,
}) => {
  const { register, handleSubmit, appStatus, errors, dispatch } =
    useAuthForm<AddFormType>(updatePackSchema)

  const [coverImg, setCoverImg] = useState<string | undefined>(deckCover)

  const onChangeCoverInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeImg(e, dispatch, setCoverImg)
  }

  const imgErrorHandler = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    error.currentTarget.src = errorImg
    dispatch(setAppMessage('Your img is unavailable'))
    dispatch(setAppStatus('failed'))
  }

  const deleteCoverHandler = () => {
    setCoverImg('')
  }

  const onSubmit: SubmitHandler<AddFormType> = data => {
    if (deckCover !== coverImg) {
      closeModal({
        cardsPack: { _id: pack_id, name: data.name, private: data.private, deckCover: coverImg },
      })
    } else if (name !== data.name) {
      closeModal({
        cardsPack: { _id: pack_id, name: data.name, private: data.private, deckCover: coverImg },
      })
    } else {
      dispatch(setAppMessage('Nothing was changed'))
      dispatch(setAppStatus('failed'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.coverImg}>
        <Button variant="text" component="label">
          Choose cover
          <input
            type="file"
            onChange={onChangeCoverInput}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </Button>
        {coverImg && (
          <div className={s.cover}>
            <img src={coverImg} alt="img" onError={imgErrorHandler} />
            <Button variant="text" onClick={deleteCoverHandler}>
              Delete cover
            </Button>
          </div>
        )}
      </div>

      <div className={s.input}>
        <TextField
          label="Name pack"
          defaultValue={name}
          multiline
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
