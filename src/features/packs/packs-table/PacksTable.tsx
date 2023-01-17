import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

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
import { deletePack, setCurrentPage, setPageCount, updatePack } from '../packsSlice'

import s from './PacksTable.module.css'

export const PacksTable = () => {
  const packs = useAppSelector(packsSelector)
  const page = useAppSelector(currentPageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const isLoading = useAppSelector(isLoadingSelector)

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

  if (packs.length === 0) return <IsEmptyMessage />

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Cards</TableCell>
            <TableCell align="left">Last updated</TableCell>
            <TableCell align="left">Created by</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map(p => (
            <TableRow key={p._id}>
              <TableCell component="th" scope="row">
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
