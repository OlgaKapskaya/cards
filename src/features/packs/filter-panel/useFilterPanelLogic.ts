import { useCallback, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  isLoadingSelector,
  isMySelector,
  maxCardsCountSelector,
  maxRangeSelector,
  minCardsCountSelector,
  minRangeSelector,
  packNameSelector,
} from '../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { resetFilters, setTypePacks, updateSearchParams } from '../packsSlice'

export const useFilterPanelLogic = (searchParams: any, setSearchParams: (param: any) => void) => {
  const paramsObject = Object.fromEntries(searchParams)
  const user_id = searchParams.get('user_id') || ''

  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const max = useAppSelector(maxRangeSelector)
  const min = useAppSelector(minRangeSelector)

  const current_user_id = useAppSelector(userIDSelector)
  const packName = useAppSelector(packNameSelector)
  const isMy = useAppSelector(isMySelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(
      updateSearchParams({
        min: values[0],
        max: values[1],
      })
    )
  }, [])

  const onChangeTypePacks = useCallback((type: boolean) => {
    dispatch(setTypePacks(type))
    if (type) {
      // dispatch(updateSearchParams({ page: 1, user_id: current_user_id }))
      setSearchParams({ ...paramsObject, user_id: current_user_id })
    } else {
      delete paramsObject.user_id
      setSearchParams({ ...paramsObject })
    }
  }, [])

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(updateSearchParams({ packName: searchValue }))
  }, [])

  const onResetFiltersHandler = () => {
    dispatch(resetFilters())
  }

  const resetButtonDisabled =
    (!isMy && !packName && ((!min && !max) || (min === minCardsCount && max === maxCardsCount))) ||
    isLoading

  useEffect(() => {
    dispatch(setTypePacks(!!user_id))
  }, [user_id])

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
