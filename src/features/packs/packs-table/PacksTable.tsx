import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import edit from '../../../assets/img/edit-2.svg'
import learn from '../../../assets/img/teacher.svg'
import del from '../../../assets/img/trash.svg'
import { ActionButton } from '../../../common/components/action-button/ActionButton'
import { IsEmptyMessage } from '../../../common/components/is-empty-message/IsEmptyMessage'
import { PaginationComponent } from '../../../common/components/pagination/PaginationComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  cardPacksTotalCountSelector,
  currentPageSelector,
  isLoadingSelector,
  packsSelector,
  pageCountSelector,
} from '../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { deletePack, setCurrentPage, setPageCount, updatePack } from '../packsSlice'

import { PacksTableHead } from './table-head/PacksTableHead'

export const PacksTable = () => {
  const packs = useAppSelector(packsSelector)
  const page = useAppSelector(currentPageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const navigate = useNavigate()

  const profile_id = useAppSelector(userIDSelector)

  const dispatch = useAppDispatch()
  const deletePackHandler = (id: string) => {
    dispatch(deletePack({ id }))
  }

  const onChangePageHandler = (page: number, size: number) => {
    dispatch(setCurrentPage(page))
    dispatch(setPageCount(size))
  }

  const updatePackHandler = (_id: string) => {
    dispatch(updatePack({ cardsPack: { _id, name: 'NEW NAME TEST' } }))
  }

  // if (isLoading) return <Loader />

  if (packs.length === 0) return <IsEmptyMessage />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <PacksTableHead />
        <TableBody>
          {packs.map(p => (
            <TableRow key={p._id}>
              <TableCell component="th" scope="row" onClick={() => navigate(`packs/${p._id}`)}>
                {p.name}
              </TableCell>
              <TableCell align="left">{p.cardsCount}</TableCell>
              <TableCell align="left">{p.updated}</TableCell>
              <TableCell align="left">{p.user_name}</TableCell>
              <TableCell align="left">
                {p.cardsCount !== 0 && (
                  <ActionButton
                    icon={learn}
                    hint="start learning"
                    disabled={p.onEdited}
                    onClick={() => {}}
                  />
                )}
                {profile_id === p.user_id && (
                  <ActionButton
                    icon={edit}
                    hint="update pack"
                    disabled={p.onEdited}
                    onClick={() => updatePackHandler(p._id)}
                  />
                )}

                {profile_id === p.user_id && (
                  <ActionButton
                    icon={del}
                    hint="delete pack"
                    disabled={p.onEdited}
                    onClick={() => deletePackHandler(p._id)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent
        totalCount={cardPacksTotalCount ? cardPacksTotalCount : 0}
        currentPage={page}
        pageSize={pageCount}
        onPageChanged={onChangePageHandler}
        labelRowsPerPage="Cards per Page"
      />
    </TableContainer>
  )
}
