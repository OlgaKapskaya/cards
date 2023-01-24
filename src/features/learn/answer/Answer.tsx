import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { cardsSelector } from '../../../common/selectors/cardsSelectors'
import { currentCardSelector } from '../../../common/selectors/learnSelectors'
import { getRandomCard } from '../../../common/utils/getRandomCard'
import { sxButtonMarginTopWidthCreator } from '../../../common/utils/styles-utils/sxButtonCreators'
import { setCurrentCard, setIsShowAnswer } from '../learnSlice'

import s from './Answer.module.css'
import { Grades } from './grades/Grades'

export const Answer = () => {
  const { answer } = useAppSelector(currentCardSelector)
  const cards = useAppSelector(cardsSelector)

  const dispatch = useAppDispatch()

  const onNextHandler = () => {
    dispatch(setIsShowAnswer(false))
    if (cards.length > 0) {
      dispatch(setCurrentCard(getRandomCard(cards)))
    }
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
