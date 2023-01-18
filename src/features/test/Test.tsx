import React from 'react'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import EditableSpanComponent from '../../common/components/editable-span/EditableSpanComponent'
import { SliderComponent } from '../../common/components/slider/SliderComponent'
import SuperPagination from '../../common/components/SuperPagination/SuperPagination'
import { buttonRed, buttonWhite } from '../../common/constants/theme'
import { sxButtonColorCreator } from '../../common/utils/styles-utils/sxButtonCreators'

import s from './Test.module.css'

export const Test = () => {
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

      <div className={s.container}>
        Pagination:
        <SuperPagination onChange={() => {}} totalCount={50} itemsCountForPage={4} page={4} />
      </div>
    </div>
  )
}
