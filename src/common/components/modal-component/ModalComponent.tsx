import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import s from './ModalComponent.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 395,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
}

type BoxCardModalPropsType = {
  title: string
  open: boolean
  handleClose: (open: boolean) => void
  reset?: () => void
  children: ReactNode
}
export const ModalComponent: FC<BoxCardModalPropsType> = ({
  title,
  open,
  handleClose,
  reset,
  children,
}) => {
  const handleCloseReset = () => {
    reset && reset()
    handleClose(false)
  }

  return (
    <Modal open={open} onClose={handleCloseReset}>
      <Box sx={style}>
        <div className={s.contentBox}>
          <div className={s.title}>
            <div>{title}</div>
            <div className={s.cross} onClick={handleCloseReset}>
              +
            </div>
          </div>
          <div className={s.line}></div>
          <div className={s.form}> {children} </div>
        </div>
      </Box>
    </Modal>
  )
}
