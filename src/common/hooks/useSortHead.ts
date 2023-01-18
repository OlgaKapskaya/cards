import { useState } from 'react'

import { setCardsSort } from '../../features/cards/cardsSlice'

import { useAppDispatch } from './reactReduxHooks'

export type Order = 'asc' | 'desc'
// ascending - восходящий 0
// decreasing - убывающий 1

export const useSortHead = <D>(orderStart: keyof D) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof D>(orderStart)
  const dispatch = useAppDispatch()

  const handleRequestSort = (property: keyof D) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    dispatch(setCardsSort((isAsc ? '0' : '1') + property.toString()))
  }

  return { order, orderBy, handleRequestSort }
}
