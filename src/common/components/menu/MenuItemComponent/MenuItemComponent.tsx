import { FC } from 'react'

import ListItemIcon from '@mui/material/ListItemIcon'
import MenuItem from '@mui/material/MenuItem'

export type MenuItemType = {
  id?: number
  title: string
  image: string
  onClick: () => void
}
export const MenuItemComponent: FC<MenuItemType> = ({ title, image, onClick, id }) => {
  return (
    <MenuItem id={'menu-item-' + id} onClick={onClick}>
      <ListItemIcon>
        <img src={image} alt="user" style={{ width: '20px', height: '20px' }} />
      </ListItemIcon>
      {title}
    </MenuItem>
  )
}
