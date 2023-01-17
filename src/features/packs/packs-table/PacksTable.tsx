import React from 'react'

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
import { IsEmptyMessage } from '../../../common/components/is-empty-message/IsEmptyMessage'
import { Loader } from '../../../common/components/loader/Loader'
import { PaginationComponent } from '../../../common/components/pagination/PaginationComponent'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  cardPacksTotalCountSelector,
  currentPageSelector,
  isLoadingSelector,
  packsSelector,
  pageCountSelector,
  profileIdSelector,
} from '../../../common/selectors/packsListSelectors'
import { deletePack, setCurrentPage, setPageCount, setSort, updatePack } from '../packsSlice'

import s from './PacksTable.module.css'

export const PacksTable = () => {
  const packs = useAppSelector(packsSelector)
  const page = useAppSelector(currentPageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const isLoading = useAppSelector(isLoadingSelector)
  const sortPacks = useAppSelector(state => state.packs.searchParams.sort)
  const navigate = useNavigate()

  const profile_id = useAppSelector(profileIdSelector)

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

  if (isLoading) return <Loader />
  const sortValue = (value: string) => {
    if (value === 'update') {
      sortPacks === '0updated' ? dispatch(setSort('1update')) : dispatch(setSort('0updated'))
    }
    if (value === 'cards') {
      sortPacks === '0cardsCount'
        ? dispatch(setSort('1cardsCount'))
        : dispatch(setSort('0cardsCount'))
    }
    if (value === 'username') {
      sortPacks === '0user_name' ? dispatch(setSort('1user_name')) : dispatch(setSort('0user_name'))
    }
    if (value === 'name') {
      sortPacks === '0name' ? dispatch(setSort('1name')) : dispatch(setSort('0name'))
    }
  }

  if (packs.length === 0) return <IsEmptyMessage />

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
          <TableRow>
            <TableCell>
              <TableSortLabel
                direction={sortPacks === '0name' ? 'asc' : 'desc'}
                onClick={() => {
                  sortValue('name')
                }}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                direction={sortPacks === '0cardsCount' ? 'asc' : 'desc'}
                onClick={() => {
                  sortValue('cards')
                }}
              >
                Cards
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                active
                direction={sortPacks === '0updated' ? 'asc' : 'desc'}
                onClick={() => {
                  sortValue('update')
                }}
              >
                Last updated
              </TableSortLabel>
            </TableCell>
            <TableCell align="left">
              <TableSortLabel
                direction={sortPacks === '0user_name' ? 'asc' : 'desc'}
                onClick={() => {
                  sortValue('username')
                }}
              >
                Created by
              </TableSortLabel>
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
                  <img src={learn} onClick={() => {}} className={s.icon} alt="learn" />
                )}
                {profile_id === p.user_id && (
                  <img
                    src={edit}
                    onClick={() => updatePackHandler(p._id)}
                    className={s.icon}
                    alt="update"
                  />
                )}

                {profile_id === p.user_id && (
                  <img
                    src={del}
                    onClick={() => deletePackHandler(p._id)}
                    className={s.icon}
                    alt="delete"
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
