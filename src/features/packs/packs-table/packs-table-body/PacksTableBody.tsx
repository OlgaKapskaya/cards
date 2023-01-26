import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import s from './PacksTableBody.module.css'

import edit from 'assets/img/edit.svg'
import learn from 'assets/img/teacher.svg'
import del from 'assets/img/trash.svg'
import {
  ActionButton,
  useAppDispatch,
  useAppSelector,
  packsSelector,
  userIDSelector,
  ModalComponent,
  useModalComponent,
} from 'common'
import { PATH } from 'common/constants/path'
import { setCardsPageCount } from 'features/cards/cardsSlice'
import { setIsShowAnswer } from 'features/learn/learnSlice'
import { DeletePackForm } from 'features/packs/pack-forms/DeletePackForm'
import { UpdatePackForm } from 'features/packs/pack-forms/UpdatePackForm'

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

  const onClickUpdateHandler = (pack_id: string, name: string, onPrivate: boolean) => {
    createModal(
      'Edit pack',
      <UpdatePackForm pack_id={pack_id} name={name} onPrivate={onPrivate} closeModal={closeModal} />
    )
  }

  const onDeletePackTestHandler = (pack_id: string, name: string) => {
    createModal(
      'Delete pack',
      <DeletePackForm pack_id={pack_id} name={name} closeModal={closeModal} />
    )
  }

  return (
    <TableBody>
      {packs.map(p => (
        <TableRow hover key={p._id}>
          <TableCell
            onClick={() => onClickNavigateHandler(p._id)}
            className={s.nameCell}
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
          <TableCell onClick={() => onClickNavigateHandler(p._id)} align="left" className={s.cell}>
            {p.updated}
          </TableCell>
          <TableCell onClick={() => onClickNavigateHandler(p._id)} align="left" className={s.cell}>
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
                  onClick={() => onClickUpdateHandler(p._id, p.name, p.private)}
                />
                <ActionButton
                  icon={del}
                  hint="delete pack"
                  onClick={() => onDeletePackTestHandler(p._id, p.name)}
                />
              </>
            )}
          </TableCell>
        </TableRow>
      ))}
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </TableBody>
  )
}
