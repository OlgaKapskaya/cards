import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../assets/img/edit-2.svg'
import learn from '../../../../assets/img/teacher.svg'
import del from '../../../../assets/img/trash.svg'
import { ActionButton } from '../../../../common/components/buttons/action-button/ActionButton'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { packsSelector } from '../../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'
import { deletePack, updatePack } from '../../packsSlice'

import s from './PacksTableBody.module.css'

export const PacksTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const profile_id = useAppSelector(userIDSelector)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const deletePackHandler = (id: string) => {
    dispatch(deletePack({ id }))
  }
  const updatePackHandler = (_id: string) => {
    dispatch(updatePack({ cardsPack: { _id, name: 'NEW NAME TEST' } }))
  }

  return (
    <TableBody>
      {packs.map(p => (
        <TableRow key={p._id}>
          <TableCell
            className={s.linkCell}
            component="th"
            scope="row"
            onClick={() => navigate(`cards/${p._id}`)}
          >
            {p.name}
          </TableCell>
          <TableCell align="left" className={s.countCell}>
            {p.cardsCount}
          </TableCell>
          <TableCell align="left" className={s.cell}>
            {p.updated}
          </TableCell>
          <TableCell align="left" className={s.cell}>
            {p.user_name}
          </TableCell>
          <TableCell align="left">
            {p.cardsCount !== 0 && (
              <ActionButton
                icon={learn}
                hint="start learning"
                disabled={p.onEdited}
                onClick={() => {}}
              />
            )}
            {profile_id === p.user_id && (
              <ActionButton
                icon={edit}
                hint="update pack"
                disabled={p.onEdited}
                onClick={() => updatePackHandler(p._id)}
              />
            )}

            {profile_id === p.user_id && (
              <ActionButton
                icon={del}
                hint="delete pack"
                disabled={p.onEdited}
                onClick={() => deletePackHandler(p._id)}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
