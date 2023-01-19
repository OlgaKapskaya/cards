import React from 'react'

import { IsEmptyMessage } from '../../../common/components/is-empty-message/IsEmptyMessage'
import { TableComponent } from '../../../common/components/table/TableComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  cardPacksTotalCountSelector,
  currentPageSelector,
  isLoadingSelector,
  packsSelector,
  pageCountSelector,
} from '../../../common/selectors/packsListSelectors'
import { updateSearchParams } from '../packsSlice'

import { PacksTableBody } from './packs-table-body/PacksTableBody'
import { PacksTableHead } from './packs-table-head/PacksTableHead'

export const PacksTable = () => {
  const packs = useAppSelector(packsSelector)
  const page = useAppSelector(currentPageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const onChangePageHandler = (page: number, size: number) => {
    dispatch(updateSearchParams({ page, pageCount: size }))
  }

  // if (isLoading) return <Loader />

  if (packs.length === 0) return <IsEmptyMessage />

  return (
    <TableComponent
      totalCount={cardPacksTotalCount}
      page={page}
      pageSize={pageCount}
      onPageChanged={onChangePageHandler}
      paginationLabel="Packs per Page"
    >
      <PacksTableHead />
      <PacksTableBody />
    </TableComponent>
  )
}
