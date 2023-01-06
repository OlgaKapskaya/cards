import { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, FC } from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

const SuperSelect: FC<SuperSelectPropsType> = ({
  options,
  className,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const mappedOptions: any[] = options
    ? options.map((o) => (
        <option id={'hw7-option-' + o.id} className={s.option} key={o.id} value={o.id}>
          {o.value}
        </option>
      ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChangeOption && onChangeOption(+e.currentTarget.value)
  }

  const finalSelectClassName = s.select + (className ? ' ' + className : '')

  return (
    <div className={s.selectWrapper}>
      <select className={finalSelectClassName} onChange={onChangeCallback} {...restProps}>
        {mappedOptions}
      </select>
    </div>
  )
}

export default SuperSelect
