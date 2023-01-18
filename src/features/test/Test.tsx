import React from 'react'

import { nanoid } from '@reduxjs/toolkit'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import EditableSpanComponent from '../../common/components/editable-span/EditableSpanComponent'
import { SliderComponent } from '../../common/components/slider/SliderComponent'
import SuperPagination from '../../common/components/SuperPagination/SuperPagination'
import { HeaderType, TableComponent } from '../../common/components/table/TableComponent'
import { buttonRed, buttonWhite } from '../../common/constants/theme'
import { sxButtonColorCreator } from '../../common/utils/styles-utils/sxButtonCreators'

import s from './Test.module.css'

export const Test = () => {
  const headersPacksArray: HeaderType[] = [
    { id: nanoid(), title: 'Name', cellName: 'name' },
    { id: nanoid(), title: 'Cards', cellName: 'cardsCount' },
    { id: nanoid(), title: 'Last updated', cellName: 'updated' },
    { id: nanoid(), title: 'Created by', cellName: 'user_name' },
    { id: nanoid(), title: 'Actions', cellName: 'actions' },
  ]

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
        <TableComponent headers={headersPacksArray} />
      </div>

      <div className={s.container}>
        Pagination:
        <SuperPagination onChange={() => {}} totalCount={50} itemsCountForPage={4} page={4} />
      </div>
    </div>
  )
}
