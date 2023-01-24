import { useState } from 'react'

import { useAppDispatch } from '../../../../common/hooks/reactReduxHooks'

export const useCardModal = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return { open, handleOpen, handleClose, dispatch }
}
