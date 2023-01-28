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
  const { answer } = useAppSelector(currentCardSelector)

  const dispatch = useAppDispatch()

  const onNextHandler = () => {
    dispatch(upgradeGrade())
  }

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {answer}
      </span>
      <Grades />
      <ButtonComponent sx={sxButtonMarginTopWidthCreator()} onClick={onNextHandler}>
        Next
      </ButtonComponent>
    </div>
  )
}
