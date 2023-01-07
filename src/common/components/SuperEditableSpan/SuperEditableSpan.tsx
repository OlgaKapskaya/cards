import React, { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState, FC } from 'react'

import { CustomInputWithButton } from './CustomInputWithButton/CustomInputWithButton'
import editIcon from './edit-2.svg'
import s from './SuperEditableSpan.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  inputLabel?: string
  buttonName?: string
  spanProps?: DefaultSpanPropsType & { defaultText?: string } // пропсы для спана
}

const SuperEditableSpan: FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  inputLabel,
  buttonName,
  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

  const onEnterCallback = () => {
    setEditMode(false)
    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditMode(false)
    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setEditMode(true)
    onDoubleClick?.(e)
  }

  const spanClassName = s.span + (className ? ' ' + className : '')

  return (
    <>
      {editMode ? (
        // <SuperInputText
        //   autoFocus={autoFocus || true}
        //   onBlur={onBlurCallback}
        //   onEnter={onEnterCallback}
        //   className={s.input}
        //   {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        // />
        <CustomInputWithButton
          onBlur={onBlurCallback}
          autoFocus={autoFocus || true}
          onEnter={onEnterCallback}
          value={restProps.value}
          buttonName={buttonName}
          inputLabel={inputLabel}
        />
      ) : (
        <div className={s.spanBlock}>
          <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
            {children || restProps.value || defaultText}
            <img src={editIcon} className={s.pen} alt="edit" />
          </span>
        </div>
      )}
    </>
  )
}

export default SuperEditableSpan
