import { useNavigate } from 'react-router-dom'

import logoutImg from 'assets/img/logout.svg'
import user from 'assets/img/user.svg'
import { useAppDispatch } from 'common'
import { MenuItemType } from 'common/components/menu/MenuItemComponent/MenuItemComponent'
import { PATH } from 'common/constants/path'
import { logout } from 'features/auth/authSlice'

export const useProfileMenuItems = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const menuItems: MenuItemType[] = [
    { id: 1, title: 'Profile', image: user, onClick: () => navigate(PATH.PROFILE) },
    { id: 2, title: 'Logout', image: logoutImg, onClick: () => dispatch(logout()) },
  ]

  return menuItems
}
