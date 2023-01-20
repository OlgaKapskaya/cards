import { AppRootStateType } from '../../app/store'

export const packsSelector = (state: AppRootStateType) => state.packs.packs
export const maxCardsCountSelector = (state: AppRootStateType) => state.packs.maxCardsCount
export const minCardsCountSelector = (state: AppRootStateType) => state.packs.minCardsCount
export const cardPacksTotalCountSelector = (state: AppRootStateType) =>
  state.packs.cardPacksTotalCount
export const currentPageSelector = (state: AppRootStateType) => state.packs.searchParams.page
export const pageCountSelector = (state: AppRootStateType) => state.packs.searchParams.pageCount
export const searchParamsSelector = (state: AppRootStateType) => state.packs.searchParams
export const packNameSelector = (state: AppRootStateType) => state.packs.searchParams.packName
export const isLoadingSelector = (state: AppRootStateType) => state.packs.isLoading
export const minRangeSelector = (state: AppRootStateType) => state.packs.searchParams.min
export const maxRangeSelector = (state: AppRootStateType) => state.packs.searchParams.max
export const sortPackSelector = (state: AppRootStateType) => state.packs.searchParams.sortPacks
export const searchUserIdSelector = (state: AppRootStateType) => state.packs.searchParams.user_id
