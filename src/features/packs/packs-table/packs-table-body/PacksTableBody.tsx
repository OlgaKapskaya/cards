import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../assets/img/edit-2.svg'
import learn from '../../../../assets/img/teacher.svg'
import del from '../../../../assets/img/trash.svg'
import { ActionButton } from '../../../../common/components/buttons/action-button/ActionButton'
import { PATH } from '../../../../common/constants/path'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../../common/selectors/appSelectors'
import { packsSelector } from '../../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'
import { setIsShowAnswer } from '../../../learn/learnSlice'
import { deletePack, updatePack } from '../../packsSlice'
import { DeletePackModal } from '../../modals/DeletePackModal'
import { EditPackModal } from '../../modals/EditPackModal'

import s from './PacksTableBody.module.css'

export const PacksTableBody = () => {
  const packs = useAppSelector(packsSelector)
  const profileId = useAppSelector(userIDSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const navigate = useNavigate()

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
            {p.cardsCount !== 0 && (
              <ActionButton
                icon={learn}
                hint="start learning"
                disabled={loadingStatus === 'loading'}
                onClick={() => startLearnHandler(p._id)}
              />
            )}
            {profileId === p.user_id && <EditPackModal id={p._id} name={p.name} />}

            {profileId === p.user_id && <DeletePackModal id={p._id} name={p.name} />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
