import React, { useEffect, useLayoutEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ButtonComponent } from '../../common/components/buttons/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { isLoadingSelector, searchParamsSelector } from '../../common/selectors/packsListSelectors'

import { FilterPanel } from './filter-panel/FilterPanel'
import { PacksTable } from './packs-table/PacksTable'
import s from './Packs.module.css'
import { createPack, getPacks } from './packsSlice'

export const Packs = () => {
  const [, setSearchParams] = useSearchParams()
  const searchParams = useAppSelector(searchParamsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

  useEffect(() => {
    dispatch(getPacks())
  }, [searchParams])

  useLayoutEffect(() => {
    const params = {
      page: searchParams.page?.toString() || '1',
      pageCount: searchParams.pageCount?.toString() || '4',
      packName: searchParams.packName ?? '',
      sortPacks: searchParams.sortPacks ?? '0updated',
      user_id: searchParams.user_id ?? '',
    }

    setSearchParams(params)
  }, [searchParams])

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
