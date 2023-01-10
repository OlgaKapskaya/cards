import { FC } from 'react'

import { useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { ProfileAvatar } from '../../../features/Profile/ProfileAvatar/ProfileAvatar'

import { useProfileMenuComponent } from './hooks/useProfileMenuComponent'
import { MenuComponent } from './MenuComponent/MenuComponent'
import s from './ProfileMenu.module.css'

export const ProfileMenu: FC = () => {
  const userName = useAppSelector(state => state.profile.profile.name)
  const { anchorEl, open, handleMenuOpen, handleMenuClose, menuItems } = useProfileMenuComponent()

  return (
    <>
      <div className={s.menuContainer} onClick={handleMenuOpen}>
        <span className={s.userNameSpan}>{userName}</span>
        <ProfileAvatar size={36} />
      </div>
      <MenuComponent
        anchorEl={anchorEl}
        open={open}
        handleClose={handleMenuClose}
        items={menuItems}
      />
    </>
  )
}
