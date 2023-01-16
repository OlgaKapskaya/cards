import React, { FC, useCallback } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import filter from '../../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../../common/components/button/ButtonComponent'
import { InputSlider } from '../../../common/components/input-slider/InputSlider'
import { SearchInput } from '../../../common/components/search-input/SearchInput'
import { SwitchButton } from '../../../common/components/switch-button/SwitchButton'
import { PATH } from '../../../common/constants/path'
import { iconButton } from '../../../common/constants/theme'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  maxCardsCountSelector,
  minCardsCountSelector,
  typePacksSelector,
} from '../../../common/selectors/packsListSelectors'
import { setPackName, setRange, setTypePacks, TypePacks } from '../packsListSlice'

import s from './FilterPanel.module.css'

export const FilterPanel: FC = () => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const typePacks = useAppSelector(typePacksSelector)

  const dispatch = useAppDispatch()

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setRange(values))
  }, [])

  const onChangeTypePacks = (type: TypePacks) => {
    dispatch(setTypePacks(type))
  }

  const onChangeSearchHandler = (searchValue: string) => {
    dispatch(setPackName(searchValue))
  }

  return (
    <div className={s.filterPanelContainer}>
      <div className={s.search}>
        <SearchInput label="Search" onChangeText={onChangeSearchHandler} />
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
      <ButtonComponent sx={iconButton}>
        <img src={filter} alt="resetFilter" />
      </ButtonComponent>
    </div>
  )
}
