import React from 'react'

import Rating from '@mui/material/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import {
  appStatusSelector,
  cardsSelector,
  useAppSelector,
  userCardsPackIdSelector,
  userIDSelector,
} from '../../../../common'

import s from './CardsTableBody.module.css'
import { EditCardModal } from 'features/cards/cards-modal/cards-edit-modal/EditCardModal'
import { DeleteCardModal } from 'features/cards/cards-modal/cards-delete-modal/DeleteCardModal'

export const CardsTableBody = () => {
  const cards = useAppSelector(cardsSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const isMy = userId === profileId

  return (
    <TableBody>
      {cards.map(row => {
        return (
          <>
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
                <Rating name="simple-controlled" readOnly value={row.grade} />
              </TableCell>
              {isMy && (
                <TableCell align="right" className={s.cell}>
                  <EditCardModal id={row._id} disabled={loadingStatus === 'loading'} />
                  <DeleteCardModal
                    id={row._id}
                    name={row.question}
                    disabled={loadingStatus === 'loading'}
                  />
                </TableCell>
              )}
            </TableRow>
          </>
        )
      })}
    </TableBody>
  )
}
