import { AppRootStateType } from '../../app/store'

export const packsSelector = (state: AppRootStateType) => state.packsList.packs
export const cardPacksTotalCountSelector = (state: AppRootStateType) =>
  state.packsList.cardPacksTotalCount
export const currentPageSelector = (state: AppRootStateType) => state.packsList.searchParams.page
export const maxCardsCountSelector = (state: AppRootStateType) => state.packsList.maxCardsCount
export const minCardsCountSelector = (state: AppRootStateType) => state.packsList.minCardsCount
export const pageCountSelector = (state: AppRootStateType) => state.packsList.searchParams.pageCount
export const typePacksSelector = (state: AppRootStateType) => state.packsList.typePacks
export const packNameSelector = (state: AppRootStateType) => state.packsList.searchParams.packName
export const maxCardsSelector = (state: AppRootStateType) => state.packsList.searchParams.max
export const minCardsSelector = (state: AppRootStateType) => state.packsList.searchParams.min
export const packsStatusSelector = (state: AppRootStateType) => state.packsList.packsStatus
