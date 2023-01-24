import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { currentCardSelector, isShowAnswerSelector } from '../../../common/selectors/learnSelectors'
import { sxButtonMarginTopWidthCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { setIsShowAnswer } from '../learnSlice'

import s from './Question.module.css'

export const Question = () => {
  const { question, shots } = useAppSelector(currentCardSelector)
  const isShowAnswer = useAppSelector(isShowAnswerSelector)

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setIsShowAnswer(true))
  }

  return (
    <div className={s.question}>
      <span>
        <b>Question: </b> {question}
      </span>
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
