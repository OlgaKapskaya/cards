import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useParams } from 'react-router-dom'

import { BackPackLink } from '../../common/components/back-pack-link/BackPackLink'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { cardPackNameSelector, cardsSelector } from '../../common/selectors/cardsSelectors'
import { isFirstSelector, isShowAnswerSelector } from '../../common/selectors/learnSelectors'
import { getRandomCard } from '../../common/utils/getRandomCard'
import { getCards, setCardsPackId, setIsCardsLoaded } from '../cards/cardsSlice'

import { Answer } from './answer/Answer'
import s from './Learn.module.css'
import { setCurrentCard, setIsFirst } from './learnSlice'
import { Question } from './question/Question'

export const Learn = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(cardPackNameSelector)

  const isFirst = useAppSelector(isFirstSelector)
  const isShowAnswer = useAppSelector(isShowAnswerSelector)

  const { packId } = useParams<{ packId: string }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCardsPackId(packId ?? ''))

    return () => {
      dispatch(setIsCardsLoaded(false))
    }
  }, [packId])

  useEffect(() => {
    dispatch(getCards())
  }, [])

  useEffect(() => {
    if (isFirst) {
      dispatch(setIsFirst(false))
    }

    if (cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }

    // return () => {
    //   console.log('LearnContainer useEffect off')
    // }
  }, [dispatch, packId, cards, isFirst])

  return (
    <div>
      <BackPackLink />
      <div className={s.questionContainer}>
        <span className={s.title}>Learn {packName}</span>
        <Paper elevation={3}>
          <Question />
          {isShowAnswer && <Answer />}
        </Paper>
      </div>
    </div>
  )
}
