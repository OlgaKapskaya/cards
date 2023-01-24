import React, { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { FormControlLabel } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SubmitHandler, useForm } from 'react-hook-form'

import edit from '../../../assets/img/edit-2.svg'
import { ActionButton } from '../../../common/components/buttons/action-button/ActionButton'
import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { buttonWhite } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { sxButtonColorCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { updatePack } from '../packsSlice'

import { BasicModal } from './BasicModal'
import s from './modals.module.css'

type EditPackModalPropsType = {
  pack_id: string
  name: string
  privateStatus: boolean
  user_id: string
}

type IFormInput = {
  name: string
  privateStatus: boolean
}

export const EditPackModal: FC<EditPackModalPropsType> = ({
  pack_id,
  name,
  privateStatus,
  user_id,
}) => {
  const loadingStatus = useAppSelector(appStatusSelector)
  const [packStatus, setPackStatus] = useState(privateStatus)
  const dispatch = useAppDispatch()
  const profile_id = useAppSelector(userIDSelector)
  const isButtonDisabled = profile_id !== user_id

  const [open, setOpen] = useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(
      updatePack({ cardsPack: { _id: pack_id, name: data.name, private: data.privateStatus } })
    )
    setOpen(!open)
    reset()
  }

  const editModalHandler = () => {
    setOpen(!open)
  }

  return (
    <div className={isButtonDisabled ? s.disabled : ''}>
      <ActionButton
        icon={edit}
        hint="update pack"
        disabled={isButtonDisabled}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input}>
            <TextField
              label="Name pack"
              defaultValue={name}
              variant="standard"
              {...register('name')}
            />
            <div className={s.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />
                }
                label="Private pack"
                {...register('privateStatus')}
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
                type="submit"
                sx={sxButtonColorCreator(['#1976d2', 'white'])}
                disabled={loadingStatus === 'loading'}
              >
                Save
              </ButtonComponent>
            </div>
          </div>
        </form>
      </BasicModal>
    </div>
  )
}
