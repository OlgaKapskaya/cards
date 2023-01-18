import React from 'react'

import { useNavigate } from 'react-router-dom'

import { ButtonComponent } from '../../../common/components/button/ButtonComponent'
import { PATH } from '../../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import { emptySelector, userCardsPackIdSelector } from '../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { sxButtonMarginTopWidthCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { createCard } from '../cardsSlice'

export const ActiveCardsButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loadingStatus = useAppSelector(appStatusSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)

  const handleAddNewCard = () => {
    // убрать заглушку
    const payload = {
      question: 'create new question',
      answer: 'new answer',
      grade: Math.floor(Math.random() * 5),
    }

    dispatch(createCard(payload))
  }

  const isMy = userId === profileId
  // const isMy = false
  let textButton = isMy ? 'Add new card' : 'Learn to pack'
  let handleOnClick = isMy ? handleAddNewCard : () => alert('learn')

  if (emptyStatus) {
    textButton = 'Back to packs list'
    handleOnClick = () => navigate(PATH.PACKS)
  }

  return (
    <ButtonComponent
      sx={sxButtonMarginTopWidthCreator('0', '184px')}
      onClick={handleOnClick}
      disabled={loadingStatus === 'loading'}
    >
      {textButton}
    </ButtonComponent>
  )
}
