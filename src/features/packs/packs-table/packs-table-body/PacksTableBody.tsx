import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { EditPackForm } from '../../pack-forms/EditPackForm'
import { UpdatePackPayloadType } from '../../packsAPI'
import { deletePack, updatePack } from '../../packsSlice'

import s from './PacksTableBody.module.css'

import edit from 'assets/img/edit.svg'
import errorImg from 'assets/img/errorImg.png'
import learn from 'assets/img/teacher.svg'
import del from 'assets/img/trash.svg'
import {
  ActionButton,
  appStatusSelector,
  packsSelector,
  useAppDispatch,
  useAppSelector,
  userIDSelector,
  ModalComponent,
  useModalComponent,
  DeleteForm,
} from 'common'
import { PATH } from 'common/constants/path'
import { setCardsPageCount } from 'features/cards/cardsSlice'
import { setIsShowAnswer } from 'features/learn/learnSlice'

export const PacksTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const profile_id = useAppSelector(userIDSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const navigate = useNavigate()

  const { open, modalTitle, modalChildren, closeModal, createModal } = useModalComponent()

  const dispatch = useAppDispatch()

  const navigateToCardsHandler = (packId: string, packPrivate: boolean) => {
    dispatch(setCardsPageCount(4))
    navigate(`${PATH.PACKS}${PATH.CARDS}/?packId=${packId}&packPrivate=${packPrivate}`)
  }
  const startLearnHandler = (packId: string) => {
    dispatch(setIsShowAnswer(false))
    navigate(`${PATH.LEARN}/${packId}`)
  }

  const editPackHandler = (
    pack_id: string,
    name: string,
    onPrivate: boolean,
    deckCover: string
  ) => {
    const closeEditModal = (data: UpdatePackPayloadType) => {
      dispatch(updatePack(data))
        .then(() => {
          closeModal()
        })
        .catch(() => {})
    }

    createModal(
      'Edit pack',
      <EditPackForm
        pack_id={pack_id}
        name={name}
        onPrivate={onPrivate}
        closeModal={closeEditModal}
        deckCover={deckCover}
      />
    )
  }

  const deletePackHandler = (pack_id: string, name: string) => {
    const closeDeleteModal = () => {
      dispatch(deletePack({ id: pack_id }))
        .then(() => {
          closeModal()
        })
        .catch(() => {})
    }

    createModal(
      'Delete pack',
      <DeleteForm
        name={name}
        disabled={loadingStatus === 'loading'}
        closeModal={closeDeleteModal}
      />
    )
  }

  const imgErrorHandler = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    error.currentTarget.src = errorImg
  }

  return (
    <>
      <TableBody>
        {packs.map(p => (
          <TableRow hover key={p._id} className={s.tableRow}>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              className={s.nameCell}
              component="th"
              scope="row"
            >
              <div className={s.nameContainer}>
                {loadingStatus === 'loading' ? (
                  <Skeleton />
                ) : (
                  <div style={{ display: 'flex' }}>
                    {p.deckCover && (
                      <img
                        alt="img"
                        src={p.deckCover}
                        className={s.cover}
                        onError={imgErrorHandler}
                      />
                    )}
                    <div className={s.name}>{p.name}</div>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              align="left"
              className={s.countCell}
            >
              {loadingStatus === 'loading' ? <Skeleton /> : p.cardsCount}
            </TableCell>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              align="left"
              className={s.cell}
            >
              {loadingStatus === 'loading' ? <Skeleton /> : p.updated}
            </TableCell>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              align="left"
              className={s.cell}
            >
              {loadingStatus === 'loading' ? <Skeleton /> : p.user_name}
            </TableCell>
            <TableCell align="left">
              {loadingStatus === 'loading' ? (
                <Skeleton />
              ) : (
                <>
                  <ActionButton
                    icon={learn}
                    hint="start learning"
                    disabled={p.cardsCount === 0}
                    onClick={() => startLearnHandler(p._id)}
                  />
                  {profile_id === p.user_id && (
                    <>
                      <ActionButton
                        icon={edit}
                        hint="update pack"
                        onClick={() => editPackHandler(p._id, p.name, p.private, p.deckCover)}
                      />

                      <ActionButton
                        icon={del}
                        hint="delete pack"
                        onClick={() => deletePackHandler(p._id, p.name)}
                      />
                    </>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  )
}
