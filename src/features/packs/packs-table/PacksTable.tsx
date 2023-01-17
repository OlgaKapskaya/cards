import React from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { Pagination } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { Loader } from '../../../common/components/loader/Loader'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/reactReduxHooks'
import {
  currentPageSelector,
  isLoadingSelector,
  packsSelector,
  pageCountSelector,
  profileIdSelector,
} from '../../../common/selectors/packsListSelectors'
import s from '../Packs.module.css'
import { deletePack, setCurrentPage, setPageCount, updatePack } from '../packsSlice'

export const PacksTable = () => {
  const packs = useAppSelector(packsSelector)
  const page = useAppSelector(currentPageSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const profile_id = useAppSelector(profileIdSelector)

  const dispatch = useAppDispatch()
  const deletePackHandler = (id: string) => {
    dispatch(deletePack({ id }))
  }

  const onChangePageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }

  const updatePackHandler = (_id: string) => {
    dispatch(updatePack({ cardsPack: { _id, name: 'NEW NAME TEST' } }))
  }

  const onChangeRowsPerPageHandler = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    dispatch(setPageCount(page))
  }

  if (isLoading) return <Loader />

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
                  <SchoolOutlinedIcon
                    fontSize={'medium'}
                    sx={{
                      stroke: '#ffffff',
                      strokeWidth: 1,
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {}}
                  />
                )}
                {profile_id === p.user_id && (
                  <DriveFileRenameOutlineOutlinedIcon
                    fontSize={'medium'}
                    sx={{
                      stroke: '#ffffff',
                      strokeWidth: 1,
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => updatePackHandler(p._id)}
                  />
                )}

                {profile_id === p.user_id && (
                  <DeleteOutlineIcon
                    fontSize={'medium'}
                    sx={{ stroke: '#ffffff', strokeWidth: 1, cursor: 'pointer' }}
                    onClick={() => deletePackHandler(p._id)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className={s.tableFooter}>
          <TableRow>
            <Pagination count={pageCount} page={page} onChange={onChangePageHandler} />
            {/*<TablePagination*/}
            {/*  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}*/}
            {/*  colSpan={3}*/}
            {/*  count={pageCount ? pageCount : 10}*/}
            {/*  rowsPerPage={10}*/}
            {/*  page={1}*/}
            {/*  SelectProps={{*/}
            {/*    inputProps: {*/}
            {/*      'aria-label': 'Show',*/}
            {/*    },*/}
            {/*    native: true,*/}
            {/*  }}*/}
            {/*  onPageChange={() => {*/}
            {/*    console.log('onpagechange')*/}
            {/*  }}*/}
            {/*  onRowsPerPageChange={() => onChangeRowsPerPageHandler}*/}
            {/*  ActionsComponent={TablePaginationActions}*/}
            {/*/>*/}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
