import TableCell from '@mui/material/TableCell'

import {
  HeaderType,
  TableHeadComponent,
} from '../../../../common/components/table/TableHeadComponent'
import { useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { userCardsPackIdSelector } from '../../../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../../../common/selectors/profileSelectors'
import { setCardsSort } from '../../cardsSlice'

export type CardData = {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

export const CardsTableHead = () => {
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const isMy = userId === profileId

  const headersCardArray: readonly HeaderType<CardData>[] = [
    { id: 'question', label: 'Question' },
    { id: 'answer', label: 'Answer' },
    { id: 'updated', label: 'Last Updated' },
    { id: 'grade', label: 'Grade' },
  ]

  return (
    <>
      <TableHeadComponent headers={headersCardArray} setSortAC={setCardsSort}>
        {isMy && <TableCell key="empty"></TableCell>}
      </TableHeadComponent>
    </>
  )
}
