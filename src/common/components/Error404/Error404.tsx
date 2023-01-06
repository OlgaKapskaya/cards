import { FC } from 'react'

import SuperButton from '../SuperButton/SuperButton'

import error404 from './404.svg'
import s from './Error404.module.css'

export const Error404: FC = () => {
  return (
    <div className={s.mainContainer}>
      <div className={s.textContainer}>
        <h2 className={s.title}>Ooops!</h2>
        <span className={s.text}>Sorry! Page not found!</span>
        <SuperButton> Back to home page </SuperButton>
      </div>
      <img src={error404} alt="404" />
    </div>
  )
}
