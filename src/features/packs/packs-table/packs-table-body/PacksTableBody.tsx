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
import { appStatusSelector } from '../../../../common/selectors/appSelectors'
import { packsSelector } from '../../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'
import { setIsShowAnswer } from '../../../learn/learnSlice'
import { deletePack, updatePack } from '../../packsSlice'

import s from './PacksTableBody.module.css'

export const PacksTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const profileId = useAppSelector(userIDSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const deletePackHandler = (id: string) => {
    dispatch(deletePack({ id }))
  }
  const updatePackHandler = (_id: string) => {
    dispatch(updatePack({ cardsPack: { _id, name: 'NEW NAME TEST' } }))
  }

  const onClickNavigateHandler = (packId: string) => {
    navigate(`cards/${packId}`)
  }
  const startLearnHandler = (packId: string) => {
    dispatch(setIsShowAnswer(false))
    navigate(`learn/${packId}`)
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
          <TableCell align="left">
            {p.cardsCount !== 0 && (
              <ActionButton
                icon={learn}
                hint="start learning"
                disabled={loadingStatus === 'loading'}
                onClick={() => startLearnHandler(p._id)}
              />
            )}
            {profileId === p.user_id && (
              <ActionButton
                icon={edit}
                hint="update pack"
                disabled={loadingStatus === 'loading'}
                onClick={() => updatePackHandler(p._id)}
              />
            )}

            {profileId === p.user_id && (
              <ActionButton
                icon={del}
                hint="delete pack"
                disabled={loadingStatus === 'loading'}
                onClick={() => deletePackHandler(p._id)}
              />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
