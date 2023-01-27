import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { DeleteForm } from '../../../../common/components/forms/DeleteForm'
import { setCardsPageCount } from '../../../cards/cardsSlice'
import { setIsShowAnswer } from '../../../learn/learnSlice'
import { EditPackForm } from '../../pack-forms/EditPackForm'
import { UpdatePackPayloadType } from '../../packsAPI'
import { deletePack, updatePack } from '../../packsSlice'

import s from './PacksTableBody.module.css'

import edit from 'assets/img/edit.svg'
import learn from 'assets/img/teacher.svg'
import del from 'assets/img/trash.svg'
import {
  ActionButton,
  appStatusSelector,
  packsSelector,
  useAppDispatch,
  useAppSelector,
  userIDSelector,
} from 'common'
import { ModalComponent } from 'common/components/modal-component/ModalComponent'
import { useModalComponent } from 'common/components/modal-component/useModalComponent'
import { PATH } from 'common/constants/path'

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

  const editPackHandler = (pack_id: string, name: string, onPrivate: boolean) => {
    const closeEditModal = (data: UpdatePackPayloadType) => {
      dispatch(updatePack(data)).then(() => {
        closeModal()
      })
    }

    createModal(
      'Edit pack',
      <EditPackForm
        pack_id={pack_id}
        name={name}
        onPrivate={onPrivate}
        closeModal={closeEditModal}
      />
    )
  }

  const deletePackHandler = (pack_id: string, name: string) => {
    const closeDeleteModal = () => {
      dispatch(deletePack({ id: pack_id })).then(() => {
        closeModal()
      })
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
              {p.name}
            </TableCell>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              align="left"
              className={s.countCell}
            >
              {p.cardsCount}
            </TableCell>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              align="left"
              className={s.cell}
            >
              {p.updated}
            </TableCell>
            <TableCell
              onClick={() => navigateToCardsHandler(p._id, p.private)}
              align="left"
              className={s.cell}
            >
              {p.user_name}
            </TableCell>
            <TableCell align="left">
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
                    onClick={() => editPackHandler(p._id, p.name, p.private)}
                  />
                  <ActionButton
                    icon={del}
                    hint="delete pack"
                    onClick={() => deletePackHandler(p._id, p.name)}
                  />
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
