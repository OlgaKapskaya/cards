import { upgradeGrade } from '../learnSlice'

import s from './Answer.module.css'
import { Grades } from './grades/Grades'

import {
  ButtonComponent,
  useAppDispatch,
  useAppSelector,
  currentCardSelector,
  sxButtonMarginTopWidthCreator,
} from 'common'

export const Answer = () => {
  const { answer, answerImg } = useAppSelector(currentCardSelector)

  const dispatch = useAppDispatch()

  const onNextHandler = () => {
    dispatch(upgradeGrade())
  }

  const finalAnswer =
    answerImg && answerImg !== 'noImg' ? (
      <img alt="img" src={answerImg} style={{ width: '100%' }} />
    ) : (
      answer
    )

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {finalAnswer}
      </span>
      <Grades />
      <ButtonComponent sx={sxButtonMarginTopWidthCreator()} onClick={onNextHandler}>
        Next
      </ButtonComponent>
    </div>
  )
}
