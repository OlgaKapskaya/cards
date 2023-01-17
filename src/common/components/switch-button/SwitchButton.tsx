import { FC, memo } from 'react'

import { ButtonComponent } from '../button/ButtonComponent'

import s from './SwitchButton.module.css'
import { useSwitchButton } from './useSwitchButton'

type SwitchButtonPropsType = {
  label?: string
  buttonNames: string[]
  toggle: boolean
  setToggle: (toggle: boolean) => void
  disabled?: boolean
}

export const SwitchButton: FC<SwitchButtonPropsType> = memo(
  ({ label, toggle, setToggle, buttonNames, disabled }) => {
    const { onClickHandler, sxTrueButton, sxFalseButton } = useSwitchButton(toggle, setToggle)

    return (
      <div>
        <span className={s.title}> {label}</span>
        <div className={s.buttonsContainer}>
          <ButtonComponent sx={sxTrueButton} onClick={onClickHandler} disabled={disabled}>
            {buttonNames[0]}
          </ButtonComponent>
          <ButtonComponent sx={sxFalseButton} onClick={onClickHandler} disabled={disabled}>
            {buttonNames[1]}
          </ButtonComponent>
        </div>
      </div>
    )
  }
)
