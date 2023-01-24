import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { PATH } from '../../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { emptySelector, userCardsPackIdSelector } from '../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { sxButtonMarginTopWidthCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { NewCardModal } from '../cards-modal/NewCardModal'
import { createCard } from '../cardsSlice'

type NewCardType = {
  answer: string
  question: string
}

export const ActiveCardsButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loadingStatus = useAppSelector(appStatusSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)

  // -- для модалки выенсти в хук
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // -----

  const handleAddNewCard = (data: NewCardType) => {
    const payload = {
      question: data.question,
      answer: data.answer,
      grade: Math.floor(Math.random() * 5),
    }

    dispatch(createCard(payload)).then(() => {
      handleClose()
    })
  }

  const isMy = userId === profileId
  let handleOnClick = handleOpen
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
      <NewCardModal
        open={open}
        handleClose={handleClose}
        onSubmitAction={handleAddNewCard}
        disabled={loadingStatus === 'loading'}
      />
    </>
  )
}
