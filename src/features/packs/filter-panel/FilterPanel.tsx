import React, { FC, useCallback, useEffect } from 'react'

import filter from '../../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../../common/components/button/ButtonComponent'
import { InputSlider } from '../../../common/components/input-slider/InputSlider'
import { SearchInput } from '../../../common/components/search-input/SearchInput'
import { SwitchButton } from '../../../common/components/switch-button/SwitchButton'
import { iconButton } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import {
  currentPageSelector,
  maxCardsCountSelector,
  maxCardsSelector,
  minCardsCountSelector,
  minCardsSelector,
  packNameSelector,
  packsStatusSelector,
  typePacksSelector,
} from '../../../common/selectors/packsListSelectors'
import {
  getPacks,
  setMaxCount,
  setMinCount,
  setPackName,
  setTypePacks,
  TypePacks,
} from '../packsListSlice'

import s from './FilterPanel.module.css'

export const FilterPanel: FC = () => {
  const packsStatus = useAppSelector(packsStatusSelector)

  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const maxCount = useAppSelector(maxCardsSelector)
  const minCount = useAppSelector(minCardsSelector)
  const packName = useAppSelector(packNameSelector)
  const typePacks = useAppSelector(typePacksSelector)
  const dispatch = useAppDispatch()

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setMinCount(values[0]))
    dispatch(setMaxCount(values[1]))
  }, [])

  const onChangeTypePacks = (type: TypePacks) => {
    dispatch(setTypePacks(type))
  }

  const onChangeSearchHandler = (searchValue: string) => {
    dispatch(setPackName(searchValue))
  }

  useEffect(() => {
    setTimeout(() => {
      console.log('2 -  FilterPanel')
      dispatch(getPacks())
    }, 700)
  }, [maxCount, minCount, packName])

  return (
    <div className={s.filterPanelContainer}>
      <div className={s.search}>
        <SearchInput label="Search" onChangeText={onChangeSearchHandler} />
      </div>

      <SwitchButton
        label="Show packs cards"
        buttons={['My', 'All']}
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
      <ButtonComponent sx={iconButton}>
        <img src={filter} alt="resetFilter" />
      </ButtonComponent>
    </div>
  )
}
