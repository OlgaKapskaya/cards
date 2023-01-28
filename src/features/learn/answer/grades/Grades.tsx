import { useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { setGrade } from '../../learnSlice'

import { useAppDispatch } from 'common'

export const Grades = () => {
  const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setGrade(1))
  }, [])

  const onChangeGrade = (grade: number) => {
    dispatch(setGrade(grade + 1))
  }

  return (
    <FormControl>
      <span>Rate yourself:</span>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue={0}
        name="radio-buttons-group"
      >
        {grades.map((elem, index) => (
          <FormControlLabel
            key={index}
            value={index}
            control={<Radio />}
            label={elem}
            onChange={() => onChangeGrade(index)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
