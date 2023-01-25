import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector, searchParamsSelector } from '../../common'

import { FilterPanel } from './filter-panel/FilterPanel'
import { AddPackModal } from './modals/AddPackModal'
import { PacksTable } from './packs-table/PacksTable'
import s from './Packs.module.css'
import { getPacks } from './packsSlice'

export const Packs = () => {
  const [, setSearchParams] = useSearchParams()

  const stateSearchParams = useAppSelector(searchParamsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const params = {
      page: stateSearchParams.page?.toString() || '1',
      pageCount: stateSearchParams.pageCount?.toString() || '4',
      packName: stateSearchParams.packName ?? '',
      sortPacks: stateSearchParams.sortPacks ?? '0updated',
      user_id: stateSearchParams.user_id ?? '',
    }

    setSearchParams(params)
    dispatch(getPacks())
  }, [stateSearchParams])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span className={s.title}>Packs list</span>
        <AddPackModal />
      </div>

      <FilterPanel />
      <PacksTable />
    </div>
  )
}
