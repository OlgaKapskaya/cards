import { useNavigate, useSearchParams } from 'react-router-dom'

import deleteIcon from 'assets/img/delete.svg'
import editIcon from 'assets/img/edit.svg'
import learnIcon from 'assets/img/learn.svg'
import { useAppDispatch } from 'common'
import { MenuItemType } from 'common/components/menu/MenuItemComponent/MenuItemComponent'
import { PATH } from 'common/constants/path'
import { setIsShowAnswer } from 'features/learn/learnSlice'

export const useCardsMenuItems = (
  editPack: () => void,
  deletePack: () => void,
  cardsCount: number
) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [urlParams] = useSearchParams()
  const { packId } = Object.fromEntries(urlParams)

  const learnPack = () => {
    dispatch(setIsShowAnswer(false))
    navigate(`${PATH.LEARN}/${packId}`)
  }
  const menuItems: MenuItemType[] = [
    { id: 1, title: 'Edit', image: editIcon, onClick: editPack },
    { id: 2, title: 'Delete', image: deleteIcon, onClick: deletePack },
  ]

  if (cardsCount > 0)
    menuItems.push({ id: 3, title: 'Learn', image: learnIcon, onClick: learnPack })

  return menuItems
}
