import { useNavigate } from 'react-router-dom'

import deleteIcon from '../../../../assets/img/delete.svg'
import editIcon from '../../../../assets/img/edit.svg'
import learnIcon from '../../../../assets/img/learn.svg'
import { MenuItemType } from '../../../../common/components/menu/MenuItemComponent/MenuItemComponent'
import { PATH } from '../../../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { cardPackId } from '../../../../common/selectors/cardsSelectors'
import { deletePack, updatePack } from '../../../packs/packsSlice'

export const useCardsMenuItems = () => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(cardPackId)
  const navigate = useNavigate()

  const editPack = () => dispatch(updatePack({ cardsPack: { _id: packId, name: 'learn cards' } }))
  const deleteCardPack = () => {
    dispatch(deletePack({ id: packId }))
    // можно ли тут перенаправлять? а если запрос не прошел?
    // без сет таймаут двойной запрос
    setTimeout(() => navigate(PATH.PACKS), 2000)
  }
  const learnPack = () => alert('learn')
  const menuItems: MenuItemType[] = [
    { id: 1, title: 'Edit', image: editIcon, onClick: editPack },
    { id: 2, title: 'Delete', image: deleteIcon, onClick: deleteCardPack },
    { id: 3, title: 'Learn', image: learnIcon, onClick: learnPack },
  ]

  return menuItems
}
