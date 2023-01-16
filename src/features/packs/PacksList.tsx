import React, { useEffect } from 'react'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { searchParamsSelector, typePacksSelector } from '../../common/selectors/packsListSelectors'

import { FilterPanel } from './filter-panel/FilterPanel'
import { Packs } from './packs/Packs'
import s from './PacksList.module.css'
import { createPack, getPacks } from './packsListSlice'

export const PacksList = () => {
  const typePacks = useAppSelector(typePacksSelector)

  const dispatch = useAppDispatch()
  const searchParams = useAppSelector(searchParamsSelector)

  const addNewPackHandler = () => {
    dispatch(createPack({ cardsPack: { name: 'NEW TEST PACK' } }))
  }

  useEffect(() => {
    dispatch(getPacks())
  }, [searchParams, typePacks])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2>Packs list</h2>
        <ButtonComponent onClick={addNewPackHandler}>Add New Pack</ButtonComponent>
      </div>

      <FilterPanel />
      <Packs />
    </div>
  )
}
