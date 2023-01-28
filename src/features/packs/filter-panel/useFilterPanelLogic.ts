import { useCallback } from 'react'

import { resetFilters, setCurrentPage, setPackName, setRange, setUserId } from '../packsSlice'

import {
  useAppDispatch,
  useAppSelector,
  isLoadingSelector,
  maxCardsCountSelector,
  maxRangeSelector,
  minCardsCountSelector,
  minRangeSelector,
  packNameSelector,
  searchUserIdSelector,
  userIDSelector,
} from 'common'

export const useFilterPanelLogic = () => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const max = useAppSelector(maxRangeSelector)
  const min = useAppSelector(minRangeSelector)

  const currentUserId = useAppSelector(userIDSelector)
  const searchUserId = useAppSelector(searchUserIdSelector)
  const packName = useAppSelector(packNameSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setRange(values))
  }, [])

  const onChangeTypePacks = useCallback((type: boolean) => {
    dispatch(setRange([0, 0]))
    if (type) {
      dispatch(setCurrentPage(1))
      dispatch(setUserId(currentUserId))
    } else {
      dispatch(setUserId(''))
    }
  }, [])

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(setPackName(searchValue))
  }, [])

  const onResetFiltersHandler = () => {
    dispatch(resetFilters())
  }

  //если нет userId и нет поисковой строки и не установлен диапазон
  const resetButtonDisabled =
    (!searchUserId &&
      !packName &&
      ((!min && !max) || (min === minCardsCount && max === maxCardsCount))) ||
    isLoading

  const isMy = currentUserId === searchUserId

  return {
    packName,
    isMy,
    isLoading,
    minCardsCount,
    maxCardsCount,
    onChangeValuesHandler,
    onChangeTypePacks,
    onChangeSearchHandler,
    onResetFiltersHandler,
    resetButtonDisabled,
  }
}
