import { useNavigate, useParams } from 'react-router-dom'

import deleteIcon from '../../../../assets/img/delete.svg'
import editIcon from '../../../../assets/img/edit.svg'
import learnIcon from '../../../../assets/img/learn.svg'
import { MenuItemType } from '../../../../common/components/menu/MenuItemComponent/MenuItemComponent'
import { PATH } from '../../../../common/constants/path'
import { useAppDispatch } from '../../../../common/hooks/reactReduxHooks'
import { deleteCardPack, updateCardPack } from '../../cardsSlice'

export const useCardsMenuItems = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  let { packId } = useParams<{ packId: string }>()

  const editPack = () =>
    dispatch(updateCardPack({ cardsPack: { _id: packId as string, name: 'yooop cards' } }))
  const deletePack = () => {
    dispatch(deleteCardPack({ id: packId as string })).then(() => {
      navigate(PATH.PACKS)
    })
    // можно ли тут перенаправлять? а если запрос не прошел?
    // без сет таймаут двойной запрос
    // setTimeout(() => navigate(PATH.PACKS), 700)
    // navigate(PATH.PACKS)
  }
  const learnPack = () => alert('learn')
  const menuItems: MenuItemType[] = [
    { id: 1, title: 'Edit', image: editIcon, onClick: editPack },
    { id: 2, title: 'Delete', image: deleteIcon, onClick: deletePack },
    { id: 3, title: 'Learn', image: learnIcon, onClick: learnPack },
  ]

  return menuItems
}
