import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  isLoadingSelector,
  maxCardsCountSelector,
  maxRangeSelector,
  minCardsCountSelector,
  minRangeSelector,
  packNameSelector,
  searchUserIdSelector,
} from '../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { resetFilters, setCurrentPage, setPackName, setRange, setUserId } from '../packsSlice'

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
    if (type) {
      dispatch(setUserId(currentUserId))
      dispatch(setCurrentPage(1))
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

  return {
    packName,
    searchUserId,
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
