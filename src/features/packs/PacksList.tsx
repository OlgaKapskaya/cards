import React, { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'

import s from './PacksList.module.css'
import { createPack, deletePack, getPacks } from './packsListSlice'
export const PacksList = () => {
  const packs = useAppSelector(state => state.packsList.packs)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacks({}))
  }, [])

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
    dispatch(getPacks({}))
  }

  const deletePackHandler = (id: string) => {
    dispatch(deletePack({ id }))
    dispatch(getPacks({}))
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <ButtonComponent onClick={addNewPackHandler}>Add New Pack</ButtonComponent>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
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
                <TableCell align="right">{p.created}</TableCell>
                <TableCell align="right">{p.created}</TableCell>
                <TableCell align="right" onClick={() => deletePackHandler(p._id)}>
                  {'click to delete'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
