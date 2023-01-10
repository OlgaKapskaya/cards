import React, { FC } from 'react'

import { ButtonComponent } from '../../common/components/ButtonComponent/ButtonComponent'
import EditableSpanComponent from '../../common/components/EditableSpanComponent/EditableSpanComponent'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import SuperCheckbox from '../../common/components/SuperCheckbox/SuperCheckbox'
import SuperInputText from '../../common/components/SuperInputText/SuperInputText'
import SuperPagination from '../../common/components/SuperPagination/SuperPagination'
import SuperRadio from '../../common/components/SuperRadio/SuperRadio'
import SuperRange from '../../common/components/SuperRange/SuperRange'
import SuperSelect from '../../common/components/SuperSelect/SuperSelect'

import s from './Test.module.css'

export const Test: FC = () => {
  const options = [
    { id: 1, value: 'test 1' },
    { id: 2, value: 'test 2' },
    { id: 3, value: 'test 3' },
  ]

  return (
    <div>
      <div className={s.container}>
        Buttons
        <ButtonComponent> TEST</ButtonComponent>
        <SuperButton>default</SuperButton>
        <SuperButton xType="red">red</SuperButton>
        <SuperButton xType="secondary">secondary</SuperButton>
        <SuperButton disabled>disabled</SuperButton>
      </div>
      <div className={s.container}>
        Input:
        <SuperInputText />
      </div>
      <div className={s.container}>
        Checkbox:
        <SuperCheckbox> test </SuperCheckbox>
      </div>
      <div className={s.container}>
        Editable span:
        <EditableSpanComponent value="test" />
      </div>
      <div className={s.container}>
        Radiobutton:
        <SuperRadio options={options} value={1} />
      </div>
      <div className={s.container}>
        Select:
        <SuperSelect options={options} value={1} />
      </div>
      <div className={s.container}>
        Range:
        <SuperRange />
      </div>
      <div className={s.container}>
        Pagination:
        <SuperPagination onChange={() => {}} totalCount={50} itemsCountForPage={4} page={4} />
      </div>
    </div>
  )
}
