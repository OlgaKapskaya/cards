import React from 'react'

import { useNavigate } from 'react-router-dom'

import {
  ButtonComponent,
  useAppSelector,
  userIDSelector,
  sxButtonMarginTopWidthCreator,
  appStatusSelector,
  emptySelector,
  userCardsPackIdSelector,
} from '../../../common'
import { ModalComponent } from '../../../common/components/modal-component/ModalComponent'
import { useModalComponent } from '../../../common/components/modal-component/useModalComponent'
import { PATH } from '../../../common/constants/path'
import { AddCardForm } from '../cards-forms/AddCardForm'

export const ActiveCardsButton = () => {
  const navigate = useNavigate()
  const loadingStatus = useAppSelector(appStatusSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)

  const { open, modalTitle, modalChildren, closeModal, createModal } = useModalComponent()

  const handleAddNewCard = () =>
    createModal('Add new card', <AddCardForm closeModal={closeModal} />)

  const isMy = userId === profileId
  let handleOnClick = handleAddNewCard
  let textButton = 'Add new card'

  if (!isMy) {
    handleOnClick = emptyStatus ? () => navigate(PATH.PACKS) : () => alert('learn')
    textButton = emptyStatus ? 'Back to packs list' : 'Learn to pack'
  }

  return (
    <>
      <ButtonComponent
        sx={sxButtonMarginTopWidthCreator('0', '184px')}
        onClick={handleOnClick}
        disabled={loadingStatus === 'loading'}
      >
        {textButton}
      </ButtonComponent>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  )
}
