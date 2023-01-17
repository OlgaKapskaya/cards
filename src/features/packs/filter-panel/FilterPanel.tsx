import React, { useCallback } from 'react'

import filter from '../../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../../common/components/button/ButtonComponent'
import { InputSlider } from '../../../common/components/input-slider/InputSlider'
import { SearchInput } from '../../../common/components/search-input/SearchInput'
import { SwitchButton } from '../../../common/components/switch-button/SwitchButton'
import { iconButton } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  isLoadingSelector,
  isMySelector,
  maxCardsCountSelector,
  minCardsCountSelector,
  packNameSelector,
} from '../../../common/selectors/packsListSelectors'
import { resetFilters, setPackName, setRange, setTypePacks } from '../packsSlice'

import s from './FilterPanel.module.css'

export const FilterPanel = () => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const packName = useAppSelector(packNameSelector)
  const isMy = useAppSelector(isMySelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setRange(values))
  }, [])

  const onChangeTypePacks = useCallback((type: boolean) => {
    dispatch(setTypePacks(type))
  }, [])

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(setPackName(searchValue))
  }, [])

  const onResetFiltersHandler = () => {
    dispatch(resetFilters())
  }

  return (
    <div className={s.filterPanelContainer}>
      <div className={s.search}>
        <SearchInput
          label="Search"
          onChangeText={onChangeSearchHandler}
          searchValue={packName}
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
      <ButtonComponent sx={iconButton} onClick={onResetFiltersHandler} disabled={isLoading}>
        <img src={filter} alt="resetFilter" />
      </ButtonComponent>
    </div>
  )
}
