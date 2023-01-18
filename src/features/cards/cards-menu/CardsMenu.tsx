import { FC } from 'react'

import pointsMenu from '../../../assets/img/pointsMenu.svg'
import { MenuComponent } from '../../../common/components/menu/MenuComponent'
import { useMenuComponent } from '../../../common/components/menu/useMenuComponent'
import { useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  cardPackNameSelector,
  userCardsPackIdSelector,
} from '../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'

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
