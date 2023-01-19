import React from 'react'

import Rating from '@mui/material/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import deleteIcon from '../../../../assets/img/delete.svg'
import editIcon from '../../../../assets/img/edit.svg'
import { ActionButton } from '../../../../common/components/buttons/action-button/ActionButton'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../../common/selectors/appSelectors'
import { cardsSelector, userCardsPackIdSelector } from '../../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'
import { deleteCard, updateCard } from '../../cardsSlice'

import s from './CardsTableBody.module.css'

export const CardsTableBody = () => {
  const cards = useAppSelector(cardsSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const isMy = userId === profileId

  const dispatch = useAppDispatch()

  const handleDeleteCard = (id: string) => {
    dispatch(deleteCard({ id }))
  }
  const handleUpdateCard = (id: string) => {
    // убрать заглушку
    const payload = {
      card: {
        _id: id,
        answer: 'update answer',
        question: 'update question',
      },
    }

    dispatch(updateCard(payload))
  }

  return (
    <TableBody>
      {cards.map(row => {
        return (
          <TableRow hover key={row._id} className={s.tableRow}>
            <TableCell className={s.cellQuestion} onClick={() => alert('open card')}>
              {row.question}
            </TableCell>
            <TableCell className={s.cellAnswer} onClick={() => alert('open card')}>
              {row.answer}
            </TableCell>
            <TableCell className={s.cell} onClick={() => alert('open card')}>
              {row.updated}
            </TableCell>
            <TableCell className={s.cell}>
              <Rating name="simple-controlled" value={row.grade} />
            </TableCell>
            {isMy && (
              <TableCell align="right" className={s.cell}>
                <ActionButton
                  icon={editIcon}
                  hint="update card"
                  disabled={loadingStatus === 'loading'}
                  onClick={() => handleUpdateCard(row._id)}
                />
                <ActionButton
                  icon={deleteIcon}
                  hint="delete card"
                  disabled={loadingStatus === 'loading'}
                  onClick={() => handleDeleteCard(row._id)}
                />
              </TableCell>
            )}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
