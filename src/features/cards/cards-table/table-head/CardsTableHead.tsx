import * as React from 'react'
import { FC } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useSortHead } from '../../../../common/hooks/useSortHead'

export type Data = {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}
type HeadCell = {
  id: keyof Data
  label: string
}

const headCells: readonly HeadCell[] = [
  {
    id: 'question',
    label: 'Question',
  },
  {
    id: 'answer',
    label: 'Answer',
  },
  {
    id: 'updated',
    label: 'Last Updated',
  },
  {
    id: 'grade',
    label: 'Grade',
  },
  {
    id: 'empty',
    label: '',
  },
]

export const CardsTableHead: FC = () => {
  const { order, orderBy, handleRequestSort } = useSortHead<Data>('updated')

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: '#EFEFEF' }}>
        {headCells.map(headCell => (
          <TableCell key={headCell.id}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => handleRequestSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
