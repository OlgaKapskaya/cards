import { useState } from 'react'

import { setIsShowAnswer } from '../learnSlice'

import s from './Question.module.css'

import errorImg from 'assets/img/errorImg.png'
import {
  ButtonComponent,
  currentCardSelector,
  isShowAnswerSelector,
  sxButtonMarginTopWidthCreator,
  useAppDispatch,
  useAppSelector,
} from 'common'

export const Question = () => {
  const { question, shots, questionImg } = useAppSelector(currentCardSelector)
  const isShowAnswer = useAppSelector(isShowAnswerSelector)
  const [isImgBroken, setIsImgBroken] = useState(false)
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setIsShowAnswer(true))
  }
  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true)
  }

  const finalQuestion =
    questionImg && questionImg !== 'noImg' ? (
      <img
        alt="img"
        src={isImgBroken ? errorImg : questionImg}
        style={{ width: '100%' }}
        onError={() => errorHandler(setIsImgBroken)}
      />
    ) : (
      question
    )

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <b>Question: </b> {finalQuestion}
      </div>
      <span className={s.numberOfAnswers}>
        Number of answers to the question: <b>{shots}</b>
      </span>
      {!isShowAnswer && (
        <ButtonComponent sx={sxButtonMarginTopWidthCreator()} onClick={onClickHandler}>
          Show answer
        </ButtonComponent>
      )}
    </div>
  )
}
