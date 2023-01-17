import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import deleteIcon from '../../../assets/img/delete.svg'
import editIcon from '../../../assets/img/edit.svg'
import { PaginationComponent } from '../../../common/components/pagination/PaginationComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  cardsCurrentPageSelector,
  cardsPageCountSelector,
  cardsSelector,
  cardsTotalCountSelector,
} from '../../../common/selectors/cardsSelectors'
import { deleteCard, setCardsCurrentPage, setCardsPageCount, updateCard } from '../cardsSlice'

import s from './CardsTable.module.css'
import { CardsTableHead } from './table-head/CardsTableHead'

export interface Data {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

export type Order = 'asc' | 'desc'

export const CardsTable = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('updated')
  const cards = useAppSelector(cardsSelector)
  const currentPage = useAppSelector(cardsCurrentPageSelector)
  const pageCount = useAppSelector(cardsPageCountSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
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

  const handlePageChange = (page: number, pageSize: number) => {
    dispatch(setCardsCurrentPage(page))
    dispatch(setCardsPageCount(pageSize))
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CardsTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {cards.map(row => {
                return (
                  <TableRow hover key={row._id}>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{dayjs(row.updated).format('DD.MM.YYYY')}</TableCell>
                    <TableCell>
                      <Rating name="simple-controlled" value={row.grade} />
                    </TableCell>
                    <TableCell align="right">
                      <span className={s.icons}>
                        <img
                          src={editIcon}
                          alt="editIcon"
                          onClick={() => handleUpdateCard(row._id)}
                        />
                        <img
                          src={deleteIcon}
                          alt="deleteIcon"
                          onClick={() => handleDeleteCard(row._id)}
                        />
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <PaginationComponent
            totalCount={cardsTotalCount}
            currentPage={currentPage}
            pageSize={pageCount}
            onPageChanged={handlePageChange}
            labelRowsPerPage="Cards per Page"
          />
        </TableContainer>
      </Paper>
    </Box>
  )
}
