import React, { FC } from 'react'

import filter from '../../assets/img/filter-remove.svg'
import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import EditableSpanComponent from '../../common/components/editable-span/EditableSpanComponent'
import { InputSlider } from '../../common/components/input-slider/InputSlider'
import { SearchInput } from '../../common/components/search-input/SearchInput'
import SliderComponent from '../../common/components/slider/SliderComponent'
import SuperPagination from '../../common/components/SuperPagination/SuperPagination'
import { SwitchButton } from '../../common/components/switch-button/SwitchButton'
import { buttonRed, buttonWhite, iconButton } from '../../common/constants/theme'
import { sxButtonColorCreator } from '../../common/utils/styles-utils/sxButtonCreators'

import s from './Test.module.css'

export const Test: FC = () => {
  return (
    <div>
      <div className={s.container}>
        Buttons
        <div>
          <ButtonComponent> default button </ButtonComponent>
          <ButtonComponent sx={sxButtonColorCreator(buttonWhite)}>white button</ButtonComponent>
          <ButtonComponent sx={sxButtonColorCreator(buttonRed)}>red button</ButtonComponent>
        </div>
      </div>
      <div className={s.container}>
        Editable span:
        <EditableSpanComponent value="test" buttonName="save" />
      </div>

      <div className={s.container}>
        Custom slider:
        <SliderComponent />
      </div>

      <div className={s.filterContainer}>
        <div className={s.search}>
          <SearchInput label="Search" />
        </div>

        <SwitchButton label="Show packs cards" buttons={['My', 'All']} currentButton="All" />
        <InputSlider
          minValue={0}
          maxValue={100}
          sliderWidth={155}
          label="Number of cards"
          onChangeValues={(a: number[]) => {
            console.log(a)
          }}
        />
        <ButtonComponent sx={iconButton}>
          <img src={filter} alt="resetFilter" />
        </ButtonComponent>
      </div>
      <div className={s.container}>
        Pagination:
        <SuperPagination onChange={() => {}} totalCount={50} itemsCountForPage={4} page={4} />
      </div>
    </div>
  )
}
