import { AppRootStateType } from '../../app/store'

export const cardsSelector = (state: AppRootStateType) => state.cards.cards
export const foundSelector = (state: AppRootStateType) => state.cards.found
export const emptySelector = (state: AppRootStateType) => state.cards.empty
export const searchParamsSelector = (state: AppRootStateType) => state.cards.searchParams
export const searchWordSelector = (state: AppRootStateType) => state.cards.searchParams.searchWord
export const cardsCurrentPageSelector = (state: AppRootStateType) => state.cards.searchParams.page
export const cardsPageCountSelector = (state: AppRootStateType) =>
  state.cards.searchParams.pageCount
export const cardsTotalCountSelector = (state: AppRootStateType) => state.cards.cardsTotalCount
