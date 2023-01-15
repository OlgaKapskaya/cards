import { FC } from 'react'

import pointsMenu from '../../../assets/img/pointsMenu.svg'
import { MenuComponent } from '../../../common/components/menu/MenuComponent'
import { useMenuComponent } from '../../../common/components/menu/useMenuComponent'

import s from './CardsMenu.module.css'
import { useCardsMenuItems } from './hooks/useCardsMenuItems'

export const CardsMenu: FC = () => {
  const { anchorEl, open, handleMenuOpen, handleMenuClose } = useMenuComponent()
  const profileMenuItems = useCardsMenuItems()

  return (
    <>
      <div className={s.menuContainer} onClick={handleMenuOpen}>
        <span className={s.titleSpan}>My Pack</span>
        <img src={pointsMenu} alt={'points-menu'} />
      </div>
      <MenuComponent
        anchorEl={anchorEl}
        open={open}
        handleClose={handleMenuClose}
        items={profileMenuItems}
      />
    </>
  )
}
