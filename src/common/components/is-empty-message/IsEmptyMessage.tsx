import { FC, ReactNode } from 'react'

import s from './IsEmptyMessage.module.css'

type IsEmptyMessagePropsType = {
  message?: string
  children?: ReactNode
}

/**
 * default message: 'Nothing was found for your query. Change your search parameters.'
 */

export const IsEmptyMessage: FC<IsEmptyMessagePropsType> = ({ message, children }) => {
  return (
    <div className={s.container}>
      <span className={s.message}>
        {message ? message : 'Nothing was found for your query. Change your search parameters.'}
      </span>
      {children}
    </div>
  )
}
