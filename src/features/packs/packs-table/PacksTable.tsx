import React from 'react'

import {
  IsEmptyMessage,
  TableComponent,
  useAppDispatch,
  useAppSelector,
  cardPacksTotalCountSelector,
  currentPageSelector,
  packsSelector,
  pageCountSelector,
} from '../../../common'
import { setCurrentPage, setPageCount } from '../packsSlice'

import { PacksTableBody } from './packs-table-body/PacksTableBody'
import { PacksTableHead } from './packs-table-head/PacksTableHead'

export const PacksTable = () => {
  const packs = useAppSelector(packsSelector)
  const page = useAppSelector(currentPageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  // const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const onChangePageHandler = (page: number, size: number) => {
    dispatch(setCurrentPage(page))
    dispatch(setPageCount(size))
  }

  // if (isLoading) return <Loader />

  if (packs.length === 0) return <IsEmptyMessage />

  return (
    <TableComponent
      totalCount={cardPacksTotalCount}
      page={page ?? 1}
      pageSize={pageCount ?? 4}
      onPageChanged={onChangePageHandler}
      paginationLabel="Packs per Page"
    >
      <PacksTableHead />
      <PacksTableBody />
    </TableComponent>
  )
}
