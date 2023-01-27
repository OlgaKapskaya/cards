import { useNavigate } from 'react-router-dom'

import { UpdatePackPayloadType } from '../../packs/packsAPI'
import { deleteCardPack, updateCardPack } from '../cardsSlice'

import s from './CardsMenu.module.css'
import { useCardsMenuItems } from './hooks/useCardsMenuItems'

import pointsMenu from 'assets/img/pointsMenu.svg'
import {
  appStatusSelector,
  cardPackId,
  cardPackNameSelector,
  MenuComponent,
  useAppDispatch,
  useAppSelector,
  userCardsPackIdSelector,
  userIDSelector,
} from 'common'
import { DeleteForm } from 'common/components/forms/DeleteForm'
import { useMenuComponent } from 'common/components/menu/useMenuComponent'
import { ModalComponent } from 'common/components/modal-component/ModalComponent'
import { useModalComponent } from 'common/components/modal-component/useModalComponent'
import { PATH } from 'common/constants/path'
import { EditPackForm } from 'features/packs/pack-forms/EditPackForm'

export const CardsMenu = () => {
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const packName = useAppSelector(cardPackNameSelector)
  const packId = useAppSelector(cardPackId)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { open: openMenu, anchorEl, handleMenuOpen, handleMenuClose } = useMenuComponent()

  const {
    open: openModal,
    modalTitle,
    modalChildren,
    closeModal,
    createModal,
  } = useModalComponent()

  const editPackHandler = () => {
    const closeEditModal = (data: UpdatePackPayloadType) => {
      dispatch(updateCardPack(data)).then(() => {
        closeModal()
      })

      // dispatch(getCards()).then(() => {
      //   closeModal()
      // })
    }

    createModal(
      'Edit pack',
      <EditPackForm pack_id={packId} name={packName} closeModal={closeEditModal} />
    )
  }

  const deletePackHandler = () => {
    const closeDeleteModal = () => {
      closeModal()
      dispatch(deleteCardPack({ id: packId })).then(() => {
        navigate(PATH.PACKS)
      })
    }

    createModal(
      'Delete pack',
      <DeleteForm
        name={packName}
        closeModal={closeDeleteModal}
        disabled={loadingStatus === 'loading'}
      />
    )
  }

  const profileMenuItems = useCardsMenuItems(editPackHandler, deletePackHandler)

  const isMy = userId === profileId

  if (!isMy) return <span className={s.titleSpan}>{packName}</span>

  return (
    <>
      <div className={s.menuContainer} onClick={handleMenuOpen}>
        <span className={s.titleSpan}>{packName}</span>
        <img src={pointsMenu} alt="points-menu" />
      </div>
      <MenuComponent
        anchorEl={anchorEl}
        open={openMenu}
        handleClose={handleMenuClose}
        items={profileMenuItems}
      />
      <ModalComponent title={modalTitle} open={openModal} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  )
}
