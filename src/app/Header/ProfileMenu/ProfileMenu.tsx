import { FC } from 'react'

import { MenuComponent } from '../../../common/components/MenuComponent/MenuComponent'
import { useMenuComponent } from '../../../common/components/MenuComponent/useMenuComponent'
import { useAppSelector } from '../../../common/hooks/react-redux-hooks'
import { ProfileAvatar } from '../../../features/Profile/ProfileAvatar/ProfileAvatar'

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
