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
  const [searchParams, setSearchParams] = useSearchParams()

  const stateSearchParams = useAppSelector(searchParamsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()
  const user_id = searchParams.get('user_id') || ''

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

  useEffect(() => {
    const params = {
      page: stateSearchParams.page.toString(),
      pageCount: stateSearchParams.pageCount.toString(),
      packName: stateSearchParams.packName ?? '',
      sortPacks: stateSearchParams.sort ?? '0updated',
      user_id,
    }

    setSearchParams(params)
    dispatch(getPacks({ ...params, user_id }))
  }, [stateSearchParams, user_id])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span className={s.title}>Packs list</span>
        <ButtonComponent onClick={addNewPackHandler} disabled={isLoading}>
          Add New Pack
        </ButtonComponent>
      </div>

      <FilterPanel searchParams={searchParams} setSearchParams={setSearchParams} />
      <PacksTable />
    </div>
  )
}
