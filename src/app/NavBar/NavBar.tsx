import { FC } from 'react'

import logo from '../../assets/img/incubator-logo.svg'

import s from './NavBar.module.css'

export const NavBar: FC = () => {
  return (
    <header className={s.header}>
      <img src={logo} alt="logo" className={s.logo} />
    </header>
  )
}
