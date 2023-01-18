import {
  HeaderType,
  TableHeadComponent,
} from '../../../../common/components/table/TableHeadComponent'
import { setSort } from '../../packsSlice'

export type PackData = {
  name: string
  cardsCount: string
  updated: string
  user_name: string
  empty: string
}

export const PacksTableHead = () => {
  const headersPacksArray: readonly HeaderType<PackData>[] = [
    { id: 'name', label: 'Name' },
    { id: 'cardsCount', label: 'Cards' },
    { id: 'updated', label: 'Last updated' },
    { id: 'user_name', label: 'Created by' },
    { id: 'empty', label: 'Actions' },
  ]

  return <TableHeadComponent headers={headersPacksArray} setSortAC={setSort} />
}