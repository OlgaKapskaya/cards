import * as React from 'react'
import { FC } from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { useSortHead } from '../../../../common/hooks/useSortHead'
import { userCardsPackIdSelector } from '../../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'

export type Data = {
  question: string
  answer: string
  updated: string
  grade: string
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
]

export const CardsTableHead: FC = () => {
  const { order, orderBy, handleRequestSort } = useSortHead<Data>('updated')
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const isMy = userId === profileId

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
        {isMy && <TableCell key="empty"></TableCell>}
      </TableRow>
    </TableHead>
  )
}
