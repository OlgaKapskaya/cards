import { setIsShowAnswer } from '../learnSlice'

import s from './Question.module.css'

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

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setIsShowAnswer(true))
  }
  const finalQuestion =
    questionImg && questionImg !== 'noImg' ? (
      <img alt="img" src={questionImg} style={{ width: '100%' }} />
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
