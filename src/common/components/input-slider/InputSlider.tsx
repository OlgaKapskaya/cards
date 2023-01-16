import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'

import TextField from '@mui/material/TextField'

import { useDebounce } from '../../hooks/useDebounce'
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
  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const debouncedValue = useDebounce<number[]>(value, 500)

  const onChangeSliderHandler = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) return
    if (Array.isArray(value)) {
      setValue([value[0], value[1]])
    }
  }

  const onChangeMinHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue([+e.currentTarget.value, maxValue])
  }

  const onChangeMaxHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue([minValue, +e.currentTarget.value])
  }

  useEffect(() => {
    if (value[0] > value[1]) {
      setValue([value[1], value[0]])
    }
  }, [value])

  useEffect(() => {
    if (value[0] === minValue && value[1] === maxValue) return
    setValue([minValue, maxValue])
  }, [minValue, maxValue])

  useEffect(() => {
    onChangeValues(value)
  }, [debouncedValue])

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
          value={value[0]}
          onChange={onChangeMinHandler}
          className={`${s.input} ${s.value1}`}
        />
        <SliderComponent
          value={value}
          onChange={onChangeSliderHandler}
          width={sliderWidth}
          min={minValue}
          max={maxValue}
        />
        <TextField
          inputProps={inputProps}
          size="small"
          value={value[1]}
          onChange={onChangeMaxHandler}
          className={`${s.input} ${s.value2}`}
        />
      </div>
    </div>
  )
}
