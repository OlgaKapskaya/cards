import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ButtonComponent } from '../../common/components/buttons/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { isLoadingSelector, searchParamsSelector } from '../../common/selectors/packsListSelectors'

import { FilterPanel } from './filter-panel/FilterPanel'
import { PacksTable } from './packs-table/PacksTable'
import s from './Packs.module.css'
import {
  createPack,
  getPacks,
  setCurrentPage,
  setPackName,
  setPageCount,
  setUserId,
} from './packsSlice'

export const Packs = () => {
  const searchParams = useAppSelector(searchParamsSelector)
  const isLoading = useAppSelector(isLoadingSelector)

  const dispatch = useAppDispatch()

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }
  const [params, setParams] = useSearchParams()
  const page = params.get('page') || 1
  const pageCount = params.get('pageCount') || 7
  const packName = params.get('packName') || ''
  const user_id = params.get('user_id') || ''
  const paramsObject = Object.fromEntries(params)

  useEffect(() => {
    dispatch(setCurrentPage(+page))
    dispatch(setPageCount(+pageCount))
    dispatch(setPackName(packName))
    dispatch(setUserId(user_id))
    // setSearchParams({ ...paramsObject, page: (page + 1).toString() })
    // setSearchParams({ ...paramsObject, pageCount: event.target.value.toString() })
  }, [])

  useEffect(() => {
    setParams({
      // page: JSON.stringify(searchParams.page),
      // pageCount: searchParams.pageCount,
      // packName: searchParams.packName,
      user_id: searchParams.user_id,
    })
    dispatch(getPacks())
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
