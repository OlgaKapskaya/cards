import React from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { Pagination } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import TableRow from '@mui/material/TableRow'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import {
  cardPacksTotalCountSelector,
  currentPageSelector,
  packsSelector,
  typePacksSelector,
} from '../../common/selectors/packsListSelectors'

import { FilterPanel } from './filter-panel/FilterPanel'
import s from './PacksList.module.css'
import { createPack, deletePack, setCurrentPage, setPageCount, updatePack } from './packsListSlice'

export const PacksList = () => {
  const searchParams = useAppSelector(state => state.packsList.searchParams)

  // const page = useAppSelector(currentPageSelector)
  // const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
  const packs = useAppSelector(packsSelector)
  const typePacks = useAppSelector(typePacksSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      console.log('2 -  PacksList')
      dispatch(getPacks())
    }, 700)
  }, [searchParams, typePacks])

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

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

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <ButtonComponent onClick={addNewPackHandler}>Add New Pack</ButtonComponent>
      </div>

      <FilterPanel />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map(p => (
              <TableRow key={p._id}>
                <TableCell component="th" scope="row">
                  {p.name}
                </TableCell>
                <TableCell align="right">{p.name}</TableCell>
                <TableCell align="right">{p.updated}</TableCell>
                <TableCell align="right">{p.user_name}</TableCell>
                <TableCell align="right">
                  {<DeleteOutlineIcon onClick={() => deletePackHandler(p._id)} />}
                  {<DriveFileRenameOutlineOutlinedIcon onClick={() => updatePackHandler(p._id)} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className={s.tableFooter}>
            <TableRow>
              <Pagination
                count={searchParams.pageCount}
                page={searchParams.page}
                onChange={onChangePageHandler}
              />
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={searchParams.pageCount ? searchParams.pageCount : 10}
                rowsPerPage={10}
                page={1}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'Show',
                  },
                  native: true,
                }}
                onPageChange={() => {
                  console.log('onpagechange')
                }}
                onRowsPerPageChange={() => onChangeRowsPerPageHandler}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}
