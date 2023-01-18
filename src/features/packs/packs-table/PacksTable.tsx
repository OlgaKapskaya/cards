import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel/TableSortLabel'
import { useNavigate } from 'react-router-dom'

import edit from '../../../assets/img/edit-2.svg'
import learn from '../../../assets/img/teacher.svg'
import del from '../../../assets/img/trash.svg'
import { ActionButton } from '../../../common/components/action-button/ActionButton'
import { IsEmptyMessage } from '../../../common/components/is-empty-message/IsEmptyMessage'
import { Loader } from '../../../common/components/loader/Loader'
import { PaginationComponent } from '../../../common/components/pagination/PaginationComponent'
import SuperSort from '../../../common/components/SuperSort/SuperSort'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  cardPacksTotalCountSelector,
  currentPageSelector,
  isLoadingSelector,
  packsSelector,
  pageCountSelector,
} from '../../../common/selectors/packsListSelectors'
import { userIDSelector } from '../../../common/selectors/profileSelectors'
import { deletePack, setCurrentPage, setPageCount, setSort, updatePack } from '../packsSlice'

export const PacksTable = () => {
  const [sortCell, setSortCell] = useState('')

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

  const onChangeSort = (newSortCell: string) => {
    setSortCell(newSortCell)
  }

  useEffect(() => {
    dispatch(setSort(sortCell))
  }, [sortCell])

  if (isLoading) return <Loader />

  if (packs.length === 0) return <IsEmptyMessage />

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
          <TableRow>
            <TableCell>
              <TableSortLabel>Name</TableSortLabel>
              <SuperSort sort={sortCell} value={'name'} onChange={onChangeSort} />
            </TableCell>
            <TableCell align="left">
              <TableSortLabel>Cards</TableSortLabel>
              <SuperSort sort={sortCell} value={'cardsCount'} onChange={onChangeSort} />
            </TableCell>
            <TableCell align="left">
              <TableSortLabel>Last updated</TableSortLabel>
              <SuperSort sort={sortCell} value={'updated'} onChange={onChangeSort} />
            </TableCell>
            <TableCell align="left">
              <TableSortLabel>Created by</TableSortLabel>
              <SuperSort sort={sortCell} value={'user_name'} onChange={onChangeSort} />
            </TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
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
