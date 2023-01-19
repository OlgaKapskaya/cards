import React, { FC } from 'react'

import filter from '../../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../../common/components/buttons/button/ButtonComponent'
import { SwitchButton } from '../../../common/components/buttons/switch-button/SwitchButton'
import { InputSlider } from '../../../common/components/inputs/input-slider/InputSlider'
import { SearchInput } from '../../../common/components/inputs/search-input/SearchInput'
import { iconButton } from '../../../common/constants/theme'

import s from './FilterPanel.module.css'
import { useFilterPanelLogic } from './useFilterPanelLogic'

type FilterPanelPropsType = {
  searchParams: any
  setSearchParams: (param: any) => void
}

export const FilterPanel: FC<FilterPanelPropsType> = ({ setSearchParams, searchParams }) => {
  const {
    isMy,
    isLoading,
    packName,
    minCardsCount,
    maxCardsCount,
    onChangeValuesHandler,
    onChangeTypePacks,
    onChangeSearchHandler,
    onResetFiltersHandler,
    resetButtonDisabled,
  } = useFilterPanelLogic(searchParams, setSearchParams)

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
        minValue={minCardsCount || 0}
        maxValue={maxCardsCount || 0}
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
