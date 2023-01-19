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
  const isLoading = useAppSelector(isLoadingSelector)
  const searchParams = useAppSelector(searchParamsSelector)

  const dispatch = useAppDispatch()

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }
  const [params] = useSearchParams()
  const user_id = params.get('user_id') || ''

  useEffect(() => {
    dispatch(getPacks({ user_id }))
  }, [user_id, searchParams])

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
