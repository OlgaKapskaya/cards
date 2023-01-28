import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { FilterPanel } from './filter-panel/FilterPanel'
import { AddPackForm } from './pack-forms/AddPackForm'
import { PacksTable } from './packs-table/PacksTable'
import s from './Packs.module.css'
import { getPacks } from './packsSlice'

import {
  useAppDispatch,
  useAppSelector,
  searchParamsSelector,
  ButtonComponent,
  appStatusSelector,
  ModalComponent,
  useModalComponent,
} from 'common'

export const Packs = () => {
  const [, setSearchParams] = useSearchParams()
  const loadingStatus = useAppSelector(appStatusSelector)

  const { open, modalTitle, modalChildren, closeModal, createModal } = useModalComponent()

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

  const addPackHandler = () => {
    createModal('Add new pack', <AddPackForm closeModal={closeModal} />)
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <span className={s.title}>Packs list</span>
        <ButtonComponent onClick={addPackHandler} disabled={loadingStatus === 'loading'}>
          Add New Pack
        </ButtonComponent>
      </div>

      <FilterPanel />
      <PacksTable />

      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </div>
  )
}
