import {
  HeaderType,
  TableHeadComponent,
} from '../../../../common/components/table/TableHeadComponent'
import { useAppSelector } from '../../../../common/hooks/reactReduxHooks'
import { sortPackSelector } from '../../../../common/selectors/packsListSelectors'
import { setSort } from '../../packsSlice'

export type PackData = {
  name: string
  cardsCount: string
  updated: string
  user_name: string
  empty: string
}

const headersPacksArray: readonly HeaderType<PackData>[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last updated' },
  { id: 'user_name', label: 'Created by' },
  { id: 'empty', label: 'Actions' },
]

export const PacksTableHead = () => {
  const sort = useAppSelector(sortPackSelector)
  const sortBy = sort ? sort.substring(1) : 'update'
  const sortOrder = sort ? sort[0] : '0'

  return (
    <TableHeadComponent
      headers={headersPacksArray}
      setSortAC={setSort}
      sortBy={sortBy}
      sortOrderStart={sortOrder}
    />
  )
}
