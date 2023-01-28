import React from 'react'

import { useNavigate } from 'react-router-dom'

import { AddCardForm } from '../cards-forms/AddCardForm'

import {
  ModalComponent,
  useModalComponent,
  ButtonComponent,
  useAppSelector,
  userIDSelector,
  sxButtonMarginTopWidthCreator,
  appStatusSelector,
  emptySelector,
  userCardsPackIdSelector,
  useAppDispatch,
  cardPackId,
} from 'common'
import { PATH } from 'common/constants/path'
import { setIsShowAnswer } from 'features/learn/learnSlice'

export const ActiveCardsButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loadingStatus = useAppSelector(appStatusSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const packId = useAppSelector(cardPackId)

  const { open, modalTitle, modalChildren, closeModal, createModal } = useModalComponent()

  const handleAddNewCard = () =>
    createModal('Add new card', <AddCardForm closeModal={closeModal} />)

  const isMy = userId === profileId
  let handleOnClick = handleAddNewCard
  let textButton = 'Add new card'

  if (!isMy) {
    handleOnClick = emptyStatus
      ? () => navigate(PATH.PACKS)
      : () => {
          dispatch(setIsShowAnswer(false))
          navigate(`${PATH.LEARN}/${packId}`)
        }
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
