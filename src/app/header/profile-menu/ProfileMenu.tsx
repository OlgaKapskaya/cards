import { FC } from 'react'

import { MenuComponent, useAppSelector } from '../../../common'
import { useMenuComponent } from '../../../common/components/menu/useMenuComponent'
import { ProfileAvatar } from '../../../features/profile/profile-avatar/ProfileAvatar'

import { useProfileMenuItems } from './hooks/useProfileMenuItems'
import s from './ProfileMenu.module.css'

export const ProfileMenu: FC = () => {
  const userName = useAppSelector(state => state.profile.profile.name)
  const { anchorEl, open, handleMenuOpen, handleMenuClose } = useMenuComponent()
  const profileMenuItems = useProfileMenuItems()

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
        items={profileMenuItems}
      />
    </>
  )
}
