import React, { useEffect } from 'react'

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

  const stateSearchParams = useAppSelector(searchParamsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

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
        <ButtonComponent onClick={addNewPackHandler} disabled={isLoading}>
          Add New Pack
        </ButtonComponent>
      </div>

      <FilterPanel />
      <PacksTable />
    </div>
  )
}
