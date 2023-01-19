import React, { ReactNode } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { AnyAction } from '@reduxjs/toolkit'

import { useSortHead } from '../../hooks/useSortHead'

export type HeaderType<D> = {
  id: keyof D
  label: string
}

type Props<D> = {
  headers: readonly HeaderType<D>[]
  setSortAC: (data: string) => AnyAction
  children?: ReactNode
  sortBy?: string
}

export const TableHeadComponent = <D extends unknown>({
  headers,
  setSortAC,
  children,
  sortBy,
}: Props<D>) => {
  const { order, orderBy, requestSortHandler } = useSortHead<D>(sortBy as keyof D, setSortAC)

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#EFEFEF' }}>
        {headers.map(headCell => (
          <TableCell key={headCell.id as string}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => requestSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        {children}
      </TableRow>
    </TableHead>
  )
}
