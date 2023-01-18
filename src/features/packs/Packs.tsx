import React, { useEffect } from 'react'

import { ButtonComponent } from '../../common/components/buttons/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import {
  isLoadingSelector,
  isMySelector,
  searchParamsSelector,
} from '../../common/selectors/packsListSelectors'

import { FilterPanel } from './filter-panel/FilterPanel'
import { PacksTable } from './packs-table/PacksTable'
import s from './Packs.module.css'
import { createPack, getPacks } from './packsSlice'

export const Packs = () => {
  const searchParams = useAppSelector(searchParamsSelector)
  const isMy = useAppSelector(isMySelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

  useEffect(() => {
    dispatch(getPacks())
  }, [searchParams, isMy])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span className={s.title}>Packs list</span>
        <ButtonComponent onClick={addNewPackHandler} disabled={isLoading}>
          Add New Pack
        </ButtonComponent>
      </div>

      <FilterPanel />
      <PacksTable />
    </div>
  )
}
