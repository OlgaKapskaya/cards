import { FC, useMemo, useState, MouseEvent, useEffect } from 'react'

import ToggleButton from '@mui/material/ToggleButton'

import { TypePacks } from '../../../features/packs/packsSlice'

import { StyledToggleButtonGroup } from './styled-toggle-button-group/StyledToggleButtonGroup'
import s from './SwitchButton.module.css'

type SwitchButtonPropsType = {
  label?: string
  buttons: string | string[]
  currentButton: TypePacks
  setType: (type: TypePacks) => void
}

export const SwitchButton: FC<SwitchButtonPropsType> = ({
  label,
  buttons,
  currentButton,
  setType,
}) => {
  const buttonsGroup = useMemo(() => {
    if (!Array.isArray(buttons)) return <ToggleButton value={buttons}>{buttons}</ToggleButton>
    else {
      return buttons.map((elem, index) => (
        <ToggleButton key={index} value={elem}>
          {elem}
        </ToggleButton>
      ))
    }
  }, [buttons])

  const [alignment, setAlignment] = useState(currentButton)

  useEffect(() => {
    if (alignment === null) {
      setAlignment(currentButton)
    }
    setType(alignment)
  }, [alignment])

  const onChangeHandler = (event: MouseEvent<HTMLElement>, newAlignment: TypePacks) => {
    setAlignment(newAlignment)
  }

  return (
    <div>
      <span className={s.title}> {label}</span>
      <div className={s.container}>
        <StyledToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={onChangeHandler}
          aria-label="Platform"
        >
          {buttonsGroup}
        </StyledToggleButtonGroup>
      </div>
    </div>
  )
}
