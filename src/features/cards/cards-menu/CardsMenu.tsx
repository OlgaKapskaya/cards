import { FC } from 'react'

import pointsMenu from '../../../assets/img/pointsMenu.svg'
import {
  MenuComponent,
  useAppSelector,
  cardPackNameSelector,
  userCardsPackIdSelector,
  userIDSelector,
} from '../../../common'
import { useMenuComponent } from '../../../common/components/menu/useMenuComponent'

import s from './CardsMenu.module.css'
import { useCardsMenuItems } from './hooks/useCardsMenuItems'

export const CardsMenu: FC = () => {
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const packName = useAppSelector(cardPackNameSelector)
  const { anchorEl, open, handleMenuOpen, handleMenuClose } = useMenuComponent()
  const profileMenuItems = useCardsMenuItems()

  const isMy = userId === profileId

  if (!isMy) return <span className={s.titleSpan}>{packName}</span>

  return (
    <>
      <div className={s.menuContainer} onClick={handleMenuOpen}>
        <span className={s.titleSpan}>{packName}</span>
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
