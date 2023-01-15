import deleteIcon from '../../../../assets/img/delete.svg'
import editIcon from '../../../../assets/img/edit.svg'
import learnIcon from '../../../../assets/img/learn.svg'
import { MenuItemType } from '../../../../common/components/menu/MenuItemComponent/MenuItemComponent'

export const useCardsMenuItems = () => {
  const menuItems: MenuItemType[] = [
    { id: 1, title: 'Edit', image: editIcon, onClick: () => alert('edit') },
    { id: 2, title: 'Delete', image: deleteIcon, onClick: () => alert('delete') },
    { id: 3, title: 'Learn', image: learnIcon, onClick: () => alert('learn') },
  ]

  return menuItems
}
