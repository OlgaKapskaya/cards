import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import { useParams } from 'react-router-dom'

import { getCards, setCardsPackId, setCardsPageCount, setIsCardsLoaded } from '../cards/cardsSlice'

import { Answer } from './answer/Answer'
import s from './Learn.module.css'
import { setCurrentCard, setIsFirst } from './learnSlice'
import { Question } from './question/Question'

import {
  BackPackLink,
  Loader,
  useAppDispatch,
  useAppSelector,
  cardPackNameSelector,
  cardsSelector,
  isCardLoadedSelector,
  isFirstSelector,
  isShowAnswerSelector,
  maxCardsCountSelector,
  getRandomCard,
} from 'common'

export const Learn = () => {
  const cards = useAppSelector(cardsSelector)
  const packName = useAppSelector(cardPackNameSelector)
  const isFirst = useAppSelector(isFirstSelector)
  const isShowAnswer = useAppSelector(isShowAnswerSelector)
  const isCardsLoaded = useAppSelector(isCardLoadedSelector)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)

  const { packId } = useParams<{ packId: string }>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCardsPackId(packId ?? ''))

    return () => {
      dispatch(setIsCardsLoaded(false))
    }
  }, [packId])

  useEffect(() => {
    dispatch(setCardsPageCount(maxCardsCount ?? 100))
    dispatch(getCards())
  }, [])

  useEffect(() => {
    if (isFirst) {
      dispatch(setIsFirst(false))
    }
    if (cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }
  }, [dispatch, packId, cards, isFirst])

  if (!isCardsLoaded) {
    return <Loader />
  }

  return (
    <div>
      <BackPackLink />
      <div className={s.questionContainer}>
        <span className={s.title}>Learn &quot;{packName}&quot;</span>
        <Paper elevation={3}>
          <Question />
          {isShowAnswer && <Answer />}
        </Paper>
      </div>
    </div>
  )
}
