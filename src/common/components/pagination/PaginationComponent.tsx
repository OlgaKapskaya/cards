import { ChangeEvent, MouseEvent, FC, useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import { useDebounce } from '../../hooks/useDebounce'
import { useThrottle } from '../../hooks/useThrottle'

type PaginationComponentPropsType = {
  labelRowsPerPage?: string
  totalCount: number
  currentPage: number
  pageSize: number
  onPageChanged: (page: number, pageSize: number) => void
}

export const PaginationComponent: FC<PaginationComponentPropsType> = ({
  totalCount,
  pageSize,
  onPageChanged,
  currentPage,
  labelRowsPerPage,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  const [page, setPage] = useState(currentPage)
  const throttledPage = useThrottle(page, 1000)

  useEffect(() => {
    onPageChanged(page, rowsPerPage)
  }, [rowsPerPage, throttledPage])

  const onChangeRowsPerPageHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }
  const onChangePageHandler = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page + 1)
  }
  // const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  //
  // useEffect(() => {
  //   if (pageSize === rowsPerPage) return
  //   setRowsPerPage(pageSize)
  // }, [pageSize])
  //
  // const onChangeRowsPerPageHandler = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   onPageChanged(1, parseInt(event.target.value, 10))
  // }
  // const onChangePageHandler = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
  //   onPageChanged(page + 1, rowsPerPage)
  // }

  return (
    <TablePagination
      component="div"
      labelRowsPerPage={labelRowsPerPage}
      count={totalCount}
      page={currentPage - 1}
      onPageChange={onChangePageHandler}
      rowsPerPageOptions={[4, 7, 10, 15]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onChangeRowsPerPageHandler}
      showFirstButton
      showLastButton
    />
  )
}
