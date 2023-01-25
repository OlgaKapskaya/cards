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
import { NewCardModal } from '../cards-modal/cards-add-new-modal/NewCardModal'

export const ActiveCardsButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const loadingStatus = useAppSelector(appStatusSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const packId = useAppSelector(cardPackId)

  const isMy = userId === profileId

  let handleOnClick = emptyStatus
    ? () => navigate(PATH.PACKS)
    : () => {
        dispatch(setIsShowAnswer(false))
        navigate(`${PATH.LEARN}/${packId}`)
      }
  let textButton = emptyStatus ? 'Back to packs list' : 'Learn to pack'

  return (
    <>
      {isMy ? (
        <NewCardModal disabled={loadingStatus === 'loading'} />
      ) : (
        <ButtonComponent
          sx={sxButtonMarginTopWidthCreator('0', '184px')}
          onClick={handleOnClick}
          disabled={loadingStatus === 'loading'}
        >
          {textButton}
        </ButtonComponent>
      )}
    </>
  )
}
