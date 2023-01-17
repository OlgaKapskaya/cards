import React, { useEffect } from 'react'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { isMySelector, searchParamsSelector } from '../../common/selectors/packsListSelectors'

import { FilterPanel } from './filter-panel/FilterPanel'
import { PacksTable } from './packs-table/PacksTable'
import s from './Packs.module.css'
import { createPack, getPacks } from './packsSlice'

export const Packs = () => {
  const isMy = useAppSelector(isMySelector)

  const dispatch = useAppDispatch()
  const searchParams = useAppSelector(searchParamsSelector)

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

  useEffect(() => {
    dispatch(getPacks())
  }, [searchParams, isMy])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <ButtonComponent onClick={addNewPackHandler}>Add New Pack</ButtonComponent>
      </div>

      <FilterPanel />
      <PacksTable />
    </div>
  )
}