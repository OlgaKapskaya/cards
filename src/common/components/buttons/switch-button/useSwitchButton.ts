import { useEffect, useState } from 'react'

import { buttonWhite } from '../../../constants/theme'
import { sxButtonColorCreator } from '../../../utils/styles-utils/sxButtonCreators'

export const useSwitchButton = (toggle: boolean, setToggle: (value: boolean) => void) => {
  const [value, setValue] = useState<boolean>(toggle)

  const onClickHandler = () => {
    setValue(!value)
  }

  useEffect(() => {
    if (value === toggle) return
    setValue(toggle)
  }, [toggle])

  useEffect(() => {
    setToggle(value)
  }, [value])

  const activeButtonSX = {
    width: '98px',
    height: '36px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    margin: 0,
  }
  const whiteButton = sxButtonColorCreator(buttonWhite)
  const inactiveButtonSX = {
    ...whiteButton,
    ...activeButtonSX,
  }

  const sxTrueButton = value ? activeButtonSX : inactiveButtonSX
  const sxFalseButton = !value ? activeButtonSX : inactiveButtonSX

  return { onClickHandler, sxTrueButton, sxFalseButton }
}
