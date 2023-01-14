import { FC, SyntheticEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

import SliderComponent from '../slider/SliderComponent'

import s from './InputSlider.module.css'

type InputSliderPropsType = {
  label?: string
  minValue: number
  maxValue: number
  width?: number
  onChangeMinValue?: (min: number) => void
  onChangeMaxValue?: (nax: number) => void
}

export const InputSlider: FC<InputSliderPropsType> = ({
  label,
  minValue,
  maxValue,
  width,
  onChangeMaxValue,
  onChangeMinValue,
}) => {
  const [min, setMin] = useState(minValue)
  const [max, setMax] = useState(maxValue)

  const onChangeHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    !Array.isArray(value) && setMin(value)
    if (Array.isArray(value)) {
      setMin(value[0])
      setMax(value[1])
    }
  }

  const inputProps = {
    inputMode: 'numeric',
    pattern: '[0-9]*',
  } as const

  return (
    <div>
      <span className={s.title}> {label}</span>
      <div className={s.container}>
        <TextField
          inputProps={inputProps}
          size="small"
          value={min}
          className={`${s.input} ${s.value1}`}
        />
        <SliderComponent value={[min, max]} onChange={onChangeHandler} width={width} />
        <TextField
          inputProps={inputProps}
          size="small"
          value={max}
          className={`${s.input} ${s.value2}`}
        />
      </div>
    </div>
  )
}
