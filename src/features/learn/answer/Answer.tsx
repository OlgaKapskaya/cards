import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { currentCardSelector } from '../../../common/selectors/learnSelectors'
import { sxButtonMarginTopWidthCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { upgradeGrade } from '../learnSlice'

import s from './Answer.module.css'
import { Grades } from './grades/Grades'

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
