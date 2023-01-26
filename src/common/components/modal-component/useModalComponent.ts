import { ReactNode, useCallback, useState } from 'react'

export const useModalComponent = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalChildren, setModalChildren] = useState<ReactNode>(null)

  const createModal = (title: string, children: ReactNode) => {
    setModalTitle(title)
    setModalChildren(children)
    setOpen(true)
  }

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  return { open, modalTitle, modalChildren, closeModal, createModal }
}
