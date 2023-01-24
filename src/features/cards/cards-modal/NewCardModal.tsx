import React, { FC, useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { buttonWhite } from '../../../common/constants/theme'
import { createCardSchema } from '../../../common/constants/validators/validationSchemes'
import { useAuthForm } from '../../../common/hooks/useAuthForm'
import { sxButtonColorCreator } from '../../../common/utils/styles-utils/sxButtonCreators'

import s from './NewCardModal.module.css'

type NewCardType = {
  answer: string
  question: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 395,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  // p: 4,
}

type NewCardModalType = {
  open: boolean
  handleClose: (open: boolean) => void
  onSubmitAction: (data: NewCardType) => void
  disabled: boolean
}
export const NewCardModal: FC<NewCardModalType> = ({
  open,
  handleClose,
  onSubmitAction,
  disabled,
}) => {
  // -- для селекта
  const [select, setSelect] = useState('text')
  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value)
  }
  // -----

  // -- для полей ввода
  const { register, handleSubmit, errors, reset } = useAuthForm<NewCardType>(createCardSchema)

  const onSubmit = (data: NewCardType) => {
    onSubmitAction(data)
    // если неудачный запрос, то не логично сбрасывать
    reset()
  }

  const handleCloseReset = () => {
    reset()
    handleClose(false)
  }

  return (
    <>
      <Modal open={open} onClose={handleCloseReset}>
        <Box sx={style}>
          <div className={s.contentBox}>
            <div className={s.title}>
              <div>Add new card</div>
              <div className={s.cross} onClick={handleCloseReset}>
                +
              </div>
            </div>
            <div className={s.line}></div>
            <FormControl sx={{ minWidth: '347px' }} className={s.formSelect}>
              <div className={s.selectName}>Choose a question format</div>
              <Select value={select} onChange={handleChange} displayEmpty size="small">
                <MenuItem value={'text'}>Text</MenuItem>
                <MenuItem value={'image'}>Image</MenuItem>
              </Select>
            </FormControl>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formInput}>
              <TextField
                sx={{ m: 1, width: '347px' }}
                id="question"
                label="Question"
                variant="standard"
                {...register('question')}
                error={!!errors.question}
                helperText={errors.question?.message}
              />
              <TextField
                sx={{ m: 1, width: '347px' }}
                id="answer"
                label="Answer"
                variant="standard"
                {...register('answer')}
                error={!!errors.answer}
                helperText={errors.answer?.message}
              />
              <ButtonComponent
                type="submit"
                sx={sxButtonColorCreator(buttonWhite, '113px', '30px', '30px')}
                disabled={disabled}
              >
                Add
              </ButtonComponent>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}
