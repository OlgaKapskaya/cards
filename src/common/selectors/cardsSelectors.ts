import { AppRootStateType } from '../../app/store'

export const cardsSelector = (state: AppRootStateType) => state.cards.cards
export const foundSelector = (state: AppRootStateType) => state.cards.found
export const emptySelector = (state: AppRootStateType) => state.cards.empty
export const cardsSearchParamsSelector = (state: AppRootStateType) => state.cards.searchParams
export const cardsCurrentPageSelector = (state: AppRootStateType) => state.cards.searchParams.page
export const cardsPageCountSelector = (state: AppRootStateType) =>
  state.cards.searchParams.pageCount
export const cardsTotalCountSelector = (state: AppRootStateType) => state.cards.cardsTotalCount
export const userCardsPackIdSelector = (state: AppRootStateType) => state.cards.userPack_id
export const cardPackNameSelector = (state: AppRootStateType) => state.cards.packName
export const cardPackId = (state: AppRootStateType) => state.cards.cardsPack_id
export const sortCardSelector = (state: AppRootStateType) => state.cards.searchParams.sort
export const isCardLoadedSelector = (state: AppRootStateType) => state.cards.isCardsLoaded
export const privatePackSelector = (state: AppRootStateType) => state.cards.packPrivate
export const privatePackDeckCover = (state: AppRootStateType) => state.cards.packDeckCover
