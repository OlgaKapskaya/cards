import React, { useCallback } from 'react'

import { useSearchParams } from 'react-router-dom'

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
  minCardsCountSelector,
  rangeIdSelector,
} from '../../../common/selectors/packsListSelectors'
import { resetFilters, setPackName, setRange, setTypePacks, setUserId } from '../packsSlice'

import s from './FilterPanel.module.css'

export const FilterPanel = () => {
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const isMy = useAppSelector(isMySelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const range = useAppSelector(rangeIdSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const packName = searchParams.get('packName') || ''
  const profile_id = useAppSelector(state => state.profile.profile._id)
  const dispatch = useAppDispatch()
  const user_id = searchParams.get('user_id') || ''
  const paramsObject = Object.fromEntries(searchParams)

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setRange(values))
  }, [])

  // useEffect(() => {
  //   if (user_id) {
  //     setSearchParams({ ...paramsObject, user_id: profile_id })
  //   } else {
  //     debugger
  //     delete paramsObject.user_id
  //     setSearchParams({ ...paramsObject })
  //   }
  // }, [])

  const onChangeTypePacks = useCallback((type: boolean) => {
    dispatch(setTypePacks(type))
    if (type) {
      dispatch(setUserId(profile_id))
    }
    if (!type) {
      dispatch(setUserId(''))
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
    (!isMy &&
      !packName &&
      (range.length === 0 || (range[0] === minCardsCount && range[1] === maxCardsCount))) ||
    isLoading

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
        toggle={!!user_id}
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
