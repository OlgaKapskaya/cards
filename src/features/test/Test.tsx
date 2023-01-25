import React from 'react'

import { ButtonComponent, buttonRed, buttonWhite, sxButtonColorCreator } from '../../common'
import EditableSpanComponent from '../../common/components/inputs/editable-span/EditableSpanComponent'
import { SliderComponent } from '../../common/components/slider/SliderComponent'

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
    </div>
  )
}
