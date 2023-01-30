import { useState } from 'react'

import { upgradeGrade } from '../learnSlice'

import s from './Answer.module.css'
import { Grades } from './grades/Grades'

import errorImg from 'assets/img/errorImg.png'
import {
  ButtonComponent,
  useAppDispatch,
  useAppSelector,
  currentCardSelector,
  sxButtonMarginTopWidthCreator,
} from 'common'

export const Answer = () => {
  const { answer, answerImg } = useAppSelector(currentCardSelector)
  const [isImgBroken, setIsImgBroken] = useState(false)
  const dispatch = useAppDispatch()

  const onNextHandler = () => {
    dispatch(upgradeGrade())
  }

  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true)
  }

  const finalAnswer =
    answerImg && answerImg !== 'noImg' ? (
      <img
        alt="img"
        src={isImgBroken ? errorImg : answerImg}
        onError={() => errorHandler(setIsImgBroken)}
        style={{ width: '100%' }}
      />
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
