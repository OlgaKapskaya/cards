import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

import SliderComponent from '../slider/SliderComponent'

import s from './InputSlider.module.css'

type InputSliderPropsType = {
  label?: string
  minValue: number
  maxValue: number
  sliderWidth?: number
  onChangeValues: (value: number[]) => void
}

export const InputSlider: FC<InputSliderPropsType> = ({
  label,
  minValue,
  maxValue,
  sliderWidth,
  onChangeValues,
}) => {
  const [min, setMin] = useState<number>(minValue)
  const [max, setMax] = useState<number>(maxValue)

  const onChangeSliderHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    !Array.isArray(value) && setMin(value)
    if (Array.isArray(value)) {
      setMin(value[0])
      setMax(value[1])
    }
  }

  const onChangeMinHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMin(+e.currentTarget.value)
  }

  const onChangeMaxHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMax(+e.currentTarget.value)
  }

  useEffect(() => {
    if (min > max) {
      setMin(max)
      setMax(min)
    }

    onChangeValues([min, max])
  }, [min, max])

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
          onChange={onChangeMinHandler}
          className={`${s.input} ${s.value1}`}
        />
        <SliderComponent value={[min, max]} onChange={onChangeSliderHandler} width={sliderWidth} />
        <TextField
          inputProps={inputProps}
          size="small"
          value={max}
          onChange={onChangeMaxHandler}
          className={`${s.input} ${s.value2}`}
        />
      </div>
    </div>
  )
}
