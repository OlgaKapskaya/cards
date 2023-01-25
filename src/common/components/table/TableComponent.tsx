import React, { FC } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer'

import { PaginationComponent } from '../pagination/PaginationComponent'

type TableComponentPropsType = TableContainerProps & {
  paginationLabel?: string
  totalCount: number | undefined
  page: number
  pageSize: number
  onPageChanged: (page: number, size: number) => void
}

export const TableComponent: FC<TableComponentPropsType> = ({
  paginationLabel,
  totalCount,
  pageSize,
  page,
  onPageChanged,
  children,
  ...restProps
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer {...restProps}>
          <Table sx={{ minWidth: 750, whiteSpace: 'nowrap' }} aria-labelledby="tableTitle">
            {children}
          </Table>
          <PaginationComponent
            totalCount={totalCount ? totalCount : 0}
            currentPage={page}
            pageSize={pageSize}
            onPageChanged={onPageChanged}
            labelRowsPerPage={paginationLabel}
          />
        </TableContainer>
      </Paper>
    </Box>
  )
}
