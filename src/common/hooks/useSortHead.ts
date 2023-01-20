import { useState } from 'react'

import { AnyAction } from '@reduxjs/toolkit'

import { useAppDispatch } from './reactReduxHooks'

export type Order = 'asc' | 'desc'
// ascending - восходящий 0
// decreasing - убывающий 1

export const useSortHead = <D>(
  orderStart: keyof D,
  actionCreator: (data: string) => AnyAction,
  sortOrderStart: string
) => {
  const [order, setOrder] = useState<Order>(sortOrderStart === '1' ? 'asc' : 'desc')
  const [orderBy, setOrderBy] = useState<keyof D>(orderStart)
  const dispatch = useAppDispatch()

  const requestSortHandler = (property: keyof D) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    dispatch(actionCreator((isAsc ? '0' : '1') + property.toString()))
  }

  return { order, orderBy, requestSortHandler }
}
