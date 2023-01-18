import { useNavigate } from 'react-router-dom'

import { PATH } from '../../constants/path'
import { ButtonComponent } from '../buttons/button/ButtonComponent'

import error404 from './404.svg'
import s from './Error404.module.css'

export const Error404 = () => {
  const navigate = useNavigate()

  return (
    <div className={s.mainContainer}>
      <div className={s.textContainer}>
        <h2 className={s.title}>Ooops!</h2>
        <span className={s.text}>Sorry! Page not found!</span>
        <ButtonComponent onClick={() => navigate(PATH.PACKS)}>Back to home page</ButtonComponent>
      </div>
      <img src={error404} alt="404" />
    </div>
  )
}
