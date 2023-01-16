import * as React from 'react'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { deleteCard, getCards } from '../cardsSlice'

import { EnhancedTableHead } from './table-head/TableHead'

export interface Data {
  question: string
  answer: string
  updated: string
  grade: string
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
                  <TableRow hover key={row.question}>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{row.updated}</TableCell>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell>
                      <span onClick={() => handleDeleteCard(row._id)}>{'delete/edit'}</span>
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
