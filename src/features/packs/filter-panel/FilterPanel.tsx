import React, { FC, useCallback, useEffect } from 'react'

import filter from '../../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { SwitchButton } from '../../../common/components/buttons/switch-button/SwitchButton'
import { InputSlider } from '../../../common/components/inputs/input-slider/InputSlider'
import { SearchInput } from '../../../common/components/inputs/search-input/SearchInput'
import { iconButton } from '../../../common/constants/theme'
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
import { resetFilters, setPackName, setRange, setTypePacks } from '../packsSlice'

import s from './FilterPanel.module.css'

type FilterPanelPropsType = {
  searchParams: any
  setSearchParams: (param: any) => void
}

export const FilterPanel: FC<FilterPanelPropsType> = ({ setSearchParams, searchParams }) => {
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
    dispatch(setRange(values))
  }, [])

  const onChangeTypePacks = useCallback((type: boolean) => {
    dispatch(setTypePacks(type))
    if (type) {
      setSearchParams({ ...paramsObject, user_id: current_user_id })
    } else {
      delete paramsObject.user_id
      setSearchParams({ ...paramsObject })
    }
  }, [])

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(setPackName(searchValue))
  }, [])

  const onResetFiltersHandler = () => {
    dispatch(resetFilters())
    setSearchParams({})
  }

  const resetButtonDisabled =
    (!isMy && !packName && ((!min && !max) || (min === minCardsCount && max === maxCardsCount))) ||
    isLoading

  useEffect(() => {
    dispatch(setTypePacks(!!user_id))
  }, [user_id])

  return (
    <div className={s.filterPanelContainer}>
      <div className={s.search}>
        <SearchInput
          label="Search"
          onChangeText={onChangeSearchHandler}
          searchValue={packName ?? ''}
          disabled={isLoading}
        />
      </div>

      <SwitchButton
        disabled={isLoading}
        label="Show packs cards"
        toggle={isMy}
        setToggle={onChangeTypePacks}
        buttonNames={['my', 'all']}
      />
      <InputSlider
        minValue={minCardsCount ? minCardsCount : 0}
        maxValue={maxCardsCount ? maxCardsCount : 0}
        sliderWidth={155}
        label="Number of cards"
        onChangeValues={onChangeValuesHandler}
        disabled={isLoading}
      />
      <ButtonComponent
        sx={iconButton}
        onClick={onResetFiltersHandler}
        disabled={resetButtonDisabled}
      >
        <img src={filter} alt="resetFilter" />
      </ButtonComponent>
    </div>
  )
}
