import { setIsShowAnswer } from '../learnSlice'

import s from './Question.module.css'

import {
  ButtonComponent,
  useAppDispatch,
  useAppSelector,
  currentCardSelector,
  isShowAnswerSelector,
  sxButtonMarginTopWidthCreator,
} from 'common'

export const Question = () => {
  const { question, shots } = useAppSelector(currentCardSelector)
  const isShowAnswer = useAppSelector(isShowAnswerSelector)

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setIsShowAnswer(true))
  }

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <b>Question: </b> {question}
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
