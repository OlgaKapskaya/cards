import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import {
  ActionButton,
  useAppDispatch,
  useAppSelector,
  packsSelector,
  userIDSelector,
} from '../../../../common'
import { setCardsPageCount } from '../../../cards/cardsSlice'
import { setIsShowAnswer } from '../../../learn/learnSlice'
import { DeletePackForm } from '../../forms/DeletePackForm'
import { UpdatePackForm } from '../../forms/UpdatePackForm'

import s from './PacksTableBody.module.css'

import edit from 'assets/img/edit.svg'
import learn from 'assets/img/teacher.svg'
import del from 'assets/img/trash.svg'
import { ModalComponent } from 'common/components/modal-component/ModalComponent'
import { useModalComponent } from 'common/components/modal-component/useModalComponent'
import { PATH } from 'common/constants/path'

export const PacksTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const profile_id = useAppSelector(userIDSelector)

  const navigate = useNavigate()

  const { open, modalTitle, modalChildren, closeModal, createModal } = useModalComponent()

  const dispatch = useAppDispatch()

  const onClickNavigateHandler = (packId: string) => {
    dispatch(setCardsPageCount(4))
    navigate(`cards/${packId}`)
  }
  const startLearnHandler = (packId: string) => {
    dispatch(setIsShowAnswer(false))
    navigate(`${PATH.LEARN}/${packId}`)
  }

  const onClickUpdateHandler = (pack_id: string, name: string) => {
    createModal(
      'Edit pack',
      <UpdatePackForm pack_id={pack_id} name={name} closeModal={closeModal} />
    )
  }

  const onDeletePackTestHandler = (pack_id: string, name: string) => {
    createModal(
      'Delete pack',
      <DeletePackForm pack_id={pack_id} name={name} closeModal={closeModal} />
    )
  }

  return (
    <>
      <TableBody>
        {packs.map(p => (
          <TableRow hover key={p._id} className={s.tableRow}>
            <TableCell
              onClick={() => onClickNavigateHandler(p._id)}
              className={s.nameCell}
              component="th"
              scope="row"
            >
              {p.name}
            </TableCell>
            <TableCell
              onClick={() => onClickNavigateHandler(p._id)}
              align="left"
              className={s.countCell}
            >
              {p.cardsCount}
            </TableCell>
            <TableCell
              onClick={() => onClickNavigateHandler(p._id)}
              align="left"
              className={s.cell}
            >
              {p.updated}
            </TableCell>
            <TableCell
              onClick={() => onClickNavigateHandler(p._id)}
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

              {/*test*/}
              {profile_id === p.user_id && (
                <>
                  <ActionButton
                    icon={edit}
                    hint="update pack"
                    onClick={() => onClickUpdateHandler(p._id, p.name)}
                  />
                  <ActionButton
                    icon={del}
                    hint="delete pack"
                    onClick={() => onDeletePackTestHandler(p._id, p.name)}
                  />
                </>
              )}
              {/*<EditPackModal*/}
              {/*  pack_id={p._id}*/}
              {/*  name={p.name}*/}
              {/*  privateStatus={p.private}*/}
              {/*  user_id={p.user_id}*/}
              {/*/>*/}
              {/*<DeletePackModal pack_id={p._id} name={p.name} user_id={p.user_id} />*/}
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
