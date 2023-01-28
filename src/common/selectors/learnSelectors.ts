import { AppRootStateType } from '../../app/store'

export const currentCardSelector = (state: AppRootStateType) => state.learn.currentCard
export const isFirstSelector = (state: AppRootStateType) => state.learn.isFirst
export const isShowAnswerSelector = (state: AppRootStateType) => state.learn.isShowAnswer
