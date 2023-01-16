import * as React from 'react'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

import deleteIcon from '../../../assets/img/delete.svg'
import editIcon from '../../../assets/img/edit.svg'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { deleteCard, getCards, updateCard } from '../cardsSlice'

import { EnhancedTableHead } from './table-head/TableHead'

export interface Data {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

export type Order = 'asc' | 'desc'

export function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('updated')
  const cards = useAppSelector(state => state.cardsList.cards)
  const dispatch = useAppDispatch()

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

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

  useEffect(() => {
    // убрать заглушку
    dispatch(getCards({ cardsPack_id: '63c416a4025403b6ce37c1d1' }))
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {cards.map(row => {
                return (
                  <TableRow hover key={row._id}>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                    <TableCell>
                      <Rating name="simple-controlled" value={row.grade} />
                    </TableCell>
                    <TableCell>
                      <span>
                        <img
                          style={{ width: '24px', marginRight: '15px' }}
                          src={deleteIcon}
                          alt="deleteIcon"
                          onClick={() => handleDeleteCard(row._id)}
                        />
                        <img
                          style={{ width: '24px' }}
                          src={editIcon}
                          alt="editIcon"
                          onClick={() => handleUpdateCard(row._id)}
                        />
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
