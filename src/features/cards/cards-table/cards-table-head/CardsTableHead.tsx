import TableCell from '@mui/material/TableCell'

import {
  HeaderType,
  TableHeadComponent,
} from '../../../../common/components/table/TableHeadComponent'
import { useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import {
  sortCardSelector,
  userCardsPackIdSelector,
} from '../../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'
import { setCardsSort } from '../../cardsSlice'

export type CardData = {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

const headersCardArray: readonly HeaderType<CardData>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'grade', label: 'Grade' },
]

export const CardsTableHead = () => {
  const sort = useAppSelector(sortCardSelector)
  const sortOrder = sort ? sort[0] : '0'
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const isMy = userId === profileId

  return (
    <>
      <TableHeadComponent
        headers={headersCardArray}
        setSortAC={setCardsSort}
        sortBy={sort?.substring(1)}
        sortOrderStart={sortOrder}
      >
        {isMy && <TableCell key="empty"></TableCell>}
      </TableHeadComponent>
    </>
  )
}
