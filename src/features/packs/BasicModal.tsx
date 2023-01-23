import * as React from 'react'
import { Dispatch, FC, ReactNode, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '2px',
  boxShadow: 24,
  p: 4,
}

type BasicModalPropsType = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const BasicModal: FC<BasicModalPropsType> = ({ isOpen, setOpen, children }) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => setOpen(!isOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
