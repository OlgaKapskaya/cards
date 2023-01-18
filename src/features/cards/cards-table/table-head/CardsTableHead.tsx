import {
  HeaderType,
  TableHeadComponent,
} from '../../../../common/components/table/TableHeadComponent'
import { setCardsSort } from '../../cardsSlice'

export type CardData = {
  question: string
  answer: string
  updated: string
  grade: string
  empty: string
}

export const CardsTableHead = () => {
  const headersCardArray: readonly HeaderType<CardData>[] = [
    { id: 'question', label: 'Question' },
    { id: 'answer', label: 'Answer' },
    { id: 'updated', label: 'Last Updated' },
    { id: 'grade', label: 'Grade' },
    { id: 'empty', label: '' },
  ]

  return <TableHeadComponent headers={headersCardArray} setSortAC={setCardsSort} />
}
