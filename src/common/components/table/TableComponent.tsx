import React, { FC } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'

export type HeaderType = {
  id: string
  title: string
  cellName: string
}

type TableComponentPropsType = {
  headers: HeaderType[]
}

export const TableComponent: FC<TableComponentPropsType> = ({ headers }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
          {headers.map(elem => (
            <TableCell key={elem.id}>
              {/*<TableSortLabel*/}
              {/*direction={`0${elem.cellName}` === '0name' ? 'asc' : 'desc'}*/}
              {/*onClick={() => {*/}
              {/*  sortValue('name')*/}
              {/*}}*/}
              {/*>*/}
              {elem.title}
              {/*</TableSortLabel>*/}
            </TableCell>
          ))}
        </TableHead>

        {/*<TableBody>*/}
        {/*  {packs.map(p => (*/}
        {/*    <TableRow key={p._id}>*/}
        {/*      <TableCell component="th" scope="row" onClick={() => navigate(`packs/${p._id}`)}>*/}
        {/*        {p.name}*/}
        {/*      </TableCell>*/}
        {/*      <TableCell align="left">{p.cardsCount}</TableCell>*/}
        {/*      <TableCell align="left">{p.updated}</TableCell>*/}
        {/*      <TableCell align="left">{p.user_name}</TableCell>*/}
        {/*      <TableCell align="left">*/}
        {/*        {p.cardsCount !== 0 && (*/}
        {/*          <ActionButton*/}
        {/*            icon={learn}*/}
        {/*            hint="start learning"*/}
        {/*            disabled={p.onEdited}*/}
        {/*            onClick={() => {}}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*        {profile_id === p.user_id && (*/}
        {/*          <ActionButton*/}
        {/*            icon={edit}*/}
        {/*            hint="update pack"*/}
        {/*            disabled={p.onEdited}*/}
        {/*            onClick={() => updatePackHandler(p._id)}*/}
        {/*          />*/}
        {/*        )}*/}

        {/*        {profile_id === p.user_id && (*/}
        {/*          <ActionButton*/}
        {/*            icon={del}*/}
        {/*            hint="delete pack"*/}
        {/*            disabled={p.onEdited}*/}
        {/*            onClick={() => deletePackHandler(p._id)}*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      </TableCell>*/}
        {/*    </TableRow>*/}
        {/*  ))}*/}
        {/*</TableBody>*/}
      </Table>
    </TableContainer>
  )
}
