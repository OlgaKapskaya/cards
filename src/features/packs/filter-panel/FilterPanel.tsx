import React from 'react'

import s from './FilterPanel.module.css'
import { useFilterPanelLogic } from './useFilterPanelLogic'

import filter from 'assets/img/filter-remove.svg'
import { ButtonComponent, InputSlider, SearchInput, SwitchButton, iconButton } from 'common'

export const FilterPanel = () => {
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
  } = useFilterPanelLogic()

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
