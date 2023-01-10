import { useNavigate } from 'react-router-dom'

import logoutImg from '../../../../assets/img/logout.svg'
import user from '../../../../assets/img/user.svg'
import { PATH } from '../../../../common/constants/path'
import { useAppDispatch } from '../../../../common/hooks/react-redux-hooks'
import { logout } from '../../../../features/Login/authSlice'
import { MenuItemType } from '../MenuComponent/MenuItemComponent/MenuItemComponent'

export const useProfileMenuItem = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const menuItems: MenuItemType[] = [
    { id: 1, title: 'Profile', image: user, onClick: () => navigate(PATH.PROFILE) },
    { id: 2, title: 'Logout', image: logoutImg, onClick: () => dispatch(logout()) },
  ]

  return menuItems
}
