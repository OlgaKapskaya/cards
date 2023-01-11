import React from 'react'

import arrowDown from './img/down.svg'
import arrows from './img/none.svg'
import arrowUp from './img/up.svg'

// добавить в проект иконки и импортировать
const downIcon = arrowDown
const upIcon = arrowUp
const noneIcon = arrows

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент
  let option

  if (sort === up) {
    option = ''
  } else if (sort === down) {
    option = up
  } else {
    option = down
  }

  return option
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  let iconOption

  if (sort === down) {
    iconOption = downIcon
  } else if (sort === up) {
    iconOption = upIcon
  } else {
    iconOption = noneIcon
  }

  const icon = iconOption

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      <img
        id={id + '-icon-' + sort}
        style={{ width: '10px', marginLeft: '7px' }}
        src={icon}
        alt={'icon'}
      />
    </span>
  )
}

export default SuperSort
