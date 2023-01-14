import React, { FC } from 'react'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import EditableSpanComponent from '../../common/components/editable-span/EditableSpanComponent'
import { InputSlider } from '../../common/components/input-slider/InputSlider'
import { SearchInput } from '../../common/components/search-input/SearchInput'
import SliderComponent from '../../common/components/slider/SliderComponent'
import SuperPagination from '../../common/components/SuperPagination/SuperPagination'
import { SwitchButton } from '../../common/components/switch-button/SwitchButton'
import { sxButtonColorCreator } from '../../common/utils/styles-utils/sxButtonCreators'

import s from './Test.module.css'

export const Test: FC = () => {
  return (
    <div>
      <div className={s.container}>
        Buttons
        <div>
          <ButtonComponent> default button </ButtonComponent>
          <ButtonComponent sx={sxButtonColorCreator('#FCFCFC', '#000')}>
            white button
          </ButtonComponent>
          <ButtonComponent sx={sxButtonColorCreator('#FF3636', '#FCFCFC')}>
            red button
          </ButtonComponent>
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

      <div className={s.container}>
        <InputSlider
          minValue={0}
          maxValue={100}
          width={155}
          label="Number of cards"
          onChangeMaxValue={() => {}}
          onChangeMinValue={() => {}}
        />
      </div>
      <div className={s.container}>
        <SwitchButton label="Show packs cards" buttons={['My', 'All']} currentButton="All" />
      </div>
      <div className={s.container}>
        <SearchInput label="Search" />
      </div>
      <div className={s.container}>
        Pagination:
        <SuperPagination onChange={() => {}} totalCount={50} itemsCountForPage={4} page={4} />
      </div>
    </div>
  )
}
