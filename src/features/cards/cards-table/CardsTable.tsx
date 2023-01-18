import React from 'react'

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
import { ActionButton } from '../../../common/components/action-button/ActionButton'
import { PaginationComponent } from '../../../common/components/pagination/PaginationComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../../common/selectors/appSelectors'
import {
  cardsCurrentPageSelector,
  cardsPageCountSelector,
  cardsSelector,
  cardsTotalCountSelector,
} from '../../../common/selectors/cardsSelectors'
import { deleteCard, setCardsCurrentPage, setCardsPageCount, updateCard } from '../cardsSlice'

import s from './CardsTable.module.css'
import { CardsTableHead } from './table-head/CardsTableHead'

export const CardsTable = () => {
  // const [order, setOrder] = useState<Order>('asc')
  // const [orderBy, setOrderBy] = useState<keyof Data>('updated')
  const cards = useAppSelector(cardsSelector)
  const currentPage = useAppSelector(cardsCurrentPageSelector)
  const pageCount = useAppSelector(cardsPageCountSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const loadingStatus = useAppSelector(appStatusSelector)
  const dispatch = useAppDispatch()

  // const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
  //   const isAsc = orderBy === property && order === 'asc'
  //
  //   setOrder(isAsc ? 'desc' : 'asc')
  //   setOrderBy(property)
  // }

  const handleDeleteCard = (id: string) => {
    if (loadingStatus === 'loading') return
    dispatch(deleteCard({ id }))
  }
  const handleUpdateCard = (id: string) => {
    if (loadingStatus === 'loading') return

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
            <CardsTableHead />
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
                        <button
                          onClick={() => handleUpdateCard(row._id)}
                          disabled={loadingStatus === 'loading'}
                        >
                          <img src={editIcon} alt="editIcon" />
                        </button>
                        <button
                          onClick={() => handleDeleteCard(row._id)}
                          disabled={loadingStatus === 'loading'}
                        >
                          <img src={deleteIcon} alt="deleteIcon" />
                        </button>
                      </span>
                      <ActionButton
                        icon={editIcon}
                        hint="update card"
                        // disabled={p.onEdited}
                        onClick={() => handleUpdateCard(row._id)}
                      />
                      <ActionButton
                        icon={deleteIcon}
                        hint="delete card"
                        // disabled={p.onEdited}
                        onClick={() => handleDeleteCard(row._id)}
                      />
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
