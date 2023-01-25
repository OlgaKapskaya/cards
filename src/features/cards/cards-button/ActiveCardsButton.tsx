import React from 'react'

import { useNavigate } from 'react-router-dom'

import {
  ButtonComponent,
  useAppDispatch,
  useAppSelector,
  appStatusSelector,
  cardPackId,
  emptySelector,
  userCardsPackIdSelector,
  userIDSelector,
  sxButtonMarginTopWidthCreator,
} from '../../../common'
import { PATH } from '../../../common/constants/path'
import { setIsShowAnswer } from '../../learn/learnSlice'
import { createCard } from '../cardsSlice'

export const ActiveCardsButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loadingStatus = useAppSelector(appStatusSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const packId = useAppSelector(cardPackId)

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
    <ButtonComponent
      sx={sxButtonMarginTopWidthCreator('0', '184px')}
      onClick={handleOnClick}
      disabled={loadingStatus === 'loading'}
    >
      {textButton}
    </ButtonComponent>
  )
}
