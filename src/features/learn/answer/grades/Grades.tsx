import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { gradesSelector } from '../../../../common/selectors/learnSelectors'
import { setGrade } from '../../learnSlice'

export const Grades = () => {
  const grades = useAppSelector(gradesSelector)
  const dispatch = useAppDispatch()

  const onChangeGrade = (grade: number) => {
    dispatch(setGrade(grade))
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
