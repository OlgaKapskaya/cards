import { useNavigate, useSearchParams } from 'react-router-dom'

import { UpdatePackPayloadType } from '../../packs/packsAPI'
import { deleteCardPack, setPrivateStatus, updateCardPack } from '../cardsSlice'

import s from './CardsMenu.module.css'
import { useCardsMenuItems } from './hooks/useCardsMenuItems'

import pointsMenu from 'assets/img/pointsMenu.svg'
import {
  appStatusSelector,
  cardPackId,
  cardPackNameSelector,
  cardsTotalCountSelector,
  MenuComponent,
  privatePackSelector,
  useAppDispatch,
  useAppSelector,
  userCardsPackIdSelector,
  userIDSelector,
  ModalComponent,
  useModalComponent,
  privatePackDeckCover,
} from 'common'
import { DeleteForm } from 'common/components/forms/DeleteForm'
import { useMenuComponent } from 'common/components/menu/useMenuComponent'
import { PATH } from 'common/constants/path'
import { EditPackForm } from 'features/packs/pack-forms/EditPackForm'

export const CardsMenu = () => {
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const packName = useAppSelector(cardPackNameSelector)
  const packId = useAppSelector(cardPackId)
  const packPrivate = useAppSelector(privatePackSelector)
  const cardsCount = useAppSelector(cardsTotalCountSelector)
  const packDeckCover = useAppSelector(privatePackDeckCover)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [, setUrlParams] = useSearchParams()

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
      dispatch(updateCardPack(data))
        .then(() => {
          setUrlParams({
            packId: data.cardsPack._id?.toString(),
            packPrivate: data.cardsPack.private?.toString() || 'false',
          })
          dispatch(setPrivateStatus(data.cardsPack.private || false))
          closeModal()
        })
        .catch(() => {})
    }

    createModal(
      'Edit pack',
      <EditPackForm
        pack_id={packId}
        name={packName}
        closeModal={closeEditModal}
        onPrivate={packPrivate}
      />
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

  const cardsMenuItems = useCardsMenuItems(editPackHandler, deletePackHandler, cardsCount)

  const isMy = userId === profileId

  if (!isMy)
    return (
      <div className={s.titleImgBox}>
        <span className={s.titleSpan}>{packName}</span>
        {packDeckCover && <img className={s.cardImg} alt="react-icon" src={packDeckCover} />}
      </div>
    )

  return (
    <>
      <div className={s.titleImgBox}>
        <div className={s.menuContainer} onClick={handleMenuOpen}>
          <span className={s.titleSpan}>{packName}</span>
          <img src={pointsMenu} alt="points-menu" />
        </div>
        {packDeckCover && <img className={s.cardImg} alt="react-icon" src={packDeckCover} />}
      </div>
      <MenuComponent
        anchorEl={anchorEl}
        open={openMenu}
        handleClose={handleMenuClose}
        items={cardsMenuItems}
      />
      <ModalComponent title={modalTitle} open={openModal} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  )
}
