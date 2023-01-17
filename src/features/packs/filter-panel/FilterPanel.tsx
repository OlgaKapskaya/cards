import React, { useCallback } from 'react'

import filter from '../../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../../common/components/button/ButtonComponent'
import { InputSlider } from '../../../common/components/input-slider/InputSlider'
import { SearchInput } from '../../../common/components/search-input/SearchInput'
import { SwitchButton } from '../../../common/components/switch-button/SwitchButton'
import { iconButton } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  maxCardsCountSelector,
  minCardsCountSelector,
  packNameSelector,
  typePacksSelector,
} from '../../../common/selectors/packsListSelectors'
import { resetFilters, setPackName, setRange, setTypePacks, TypePacks } from '../packsSlice'

import s from './FilterPanel.module.css'

export const FilterPanel = () => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const packName = useAppSelector(packNameSelector)
  const typePacks = useAppSelector(typePacksSelector)

  const dispatch = useAppDispatch()

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setRange(values))
  }, [])

  const onChangeTypePacks = useCallback((type: TypePacks) => {
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
        <SearchInput label="Search" onChangeText={onChangeSearchHandler} searchValue={packName} />
      </div>

      <SwitchButton
        label="Show packs cards"
        buttons={['my', 'all']}
        currentButton={typePacks}
        setType={onChangeTypePacks}
      />
      <InputSlider
        minValue={minCardsCount ? minCardsCount : 0}
        maxValue={maxCardsCount ? maxCardsCount : 0}
        sliderWidth={155}
        label="Number of cards"
        onChangeValues={onChangeValuesHandler}
      />
      <ButtonComponent sx={iconButton} onClick={onResetFiltersHandler}>
        <img src={filter} alt="resetFilter" />
      </ButtonComponent>
    </div>
  )
}
