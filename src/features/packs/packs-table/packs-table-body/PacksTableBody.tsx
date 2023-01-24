import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import learn from '../../../../assets/img/teacher.svg'
import { ActionButton } from '../../../../common/components/buttons/action-button/ActionButton'
import { PATH } from '../../../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { packsSelector } from '../../../../common/selectors/packsListSelectors'
import { setIsShowAnswer } from '../../../learn/learnSlice'
import { DeletePackModal } from '../../modals/DeletePackModal'
import { EditPackModal } from '../../modals/EditPackModal'

import s from './PacksTableBody.module.css'

export const PacksTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onClickNavigateHandler = (packId: string) => {
    navigate(`cards/${packId}`)
  }
  const startLearnHandler = (packId: string) => {
    dispatch(setIsShowAnswer(false))
    navigate(`${PATH.LEARN}/${packId}`)
  }

  return (
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
          <TableCell onClick={() => onClickNavigateHandler(p._id)} align="left" className={s.cell}>
            {p.updated}
          </TableCell>
          <TableCell onClick={() => onClickNavigateHandler(p._id)} align="left" className={s.cell}>
            {p.user_name}
          </TableCell>
          <TableCell align="left" style={{ display: 'flex' }}>
            <div className={p.cardsCount === 0 ? s.disabled : ''}>
              <ActionButton
                icon={learn}
                hint="start learning"
                disabled={p.cardsCount === 0}
                onClick={() => startLearnHandler(p._id)}
              />
            </div>

            <EditPackModal
              pack_id={p._id}
              name={p.name}
              privateStatus={p.private}
              user_id={p.user_id}
            />

            <DeletePackModal pack_id={p._id} name={p.name} user_id={p.user_id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
