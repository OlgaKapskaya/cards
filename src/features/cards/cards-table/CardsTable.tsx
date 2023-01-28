import React from 'react'

import { setCardsCurrentPage, setCardsPageCount } from '../cardsSlice'

import { CardsTableBody } from './cards-table-body/CardsTableBody'
import { CardsTableHead } from './cards-table-head/CardsTableHead'

import {
  TableComponent,
  useAppDispatch,
  useAppSelector,
  cardsCurrentPageSelector,
  cardsPageCountSelector,
  cardsTotalCountSelector,
} from 'common'

export const CardsTable = () => {
  const currentPage = useAppSelector(cardsCurrentPageSelector)
  const pageCount = useAppSelector(cardsPageCountSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)

  const dispatch = useAppDispatch()

  const pageChangeHandler = (page: number, pageSize: number) => {
    dispatch(setCardsCurrentPage(page))
    dispatch(setCardsPageCount(pageSize))
  }

  return (
    <TableComponent
      totalCount={cardsTotalCount}
      page={currentPage}
      pageSize={pageCount}
      onPageChanged={pageChangeHandler}
      paginationLabel="Cards per Page"
    >
      <CardsTableHead />
      <CardsTableBody />
    </TableComponent>
  )
}
