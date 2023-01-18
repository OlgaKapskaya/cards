import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { BackPackLink } from '../../common/components/back-pack-link/BackPackLink'
import { SearchInput } from '../../common/components/inputs/search-input/SearchInput'
import { IsEmptyMessage } from '../../common/components/is-empty-message/IsEmptyMessage'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import {
  emptySelector,
  foundSelector,
  searchParamsSelector,
  userCardsPackIdSelector,
} from '../../common/selectors/cardsSelectors'
import { userIDSelector } from '../../common/selectors/profileSelectors'

import { ActiveCardsButton } from './cards-button/ActiveCardsButton'
import { CardsMenu } from './cards-menu/CardsMenu'
import { CardsTable } from './cards-table/CardsTable'
import s from './Cards.module.css'
import { getCards, setCardsPackId, setSearchWord } from './cardsSlice'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const foundStatus = useAppSelector(foundSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const searchParams = useAppSelector(searchParamsSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)

  const isMy = userId === profileId
  const emptyMessage = isMy
    ? 'This pack is empty. Click add new card to fill this pack'
    : 'This pack is empty. Click back to packs list'

  const handleSearchCard = (value: string) => {
    dispatch(setSearchWord(value))
  }

  const { packId } = useParams<{ packId: string }>()

  useEffect(() => {
    dispatch(setCardsPackId(packId ? packId : ''))
  }, [])

  useEffect(() => {
    // убрать заглушку
    dispatch(getCards())
  }, [searchParams])

  if (emptyStatus) {
    return (
      <div className={s.cardsPage}>
        <BackPackLink />
        <CardsMenu />
        <IsEmptyMessage message={emptyMessage}>
          <ActiveCardsButton />
        </IsEmptyMessage>
      </div>
    )
  }

  return (
    <div className={s.cardsPage}>
      <BackPackLink />
      <div className={s.titleMenu}>
        <CardsMenu />
        <ActiveCardsButton />
      </div>
      <div className={s.searchBlock}>
        <SearchInput label="Search" searchValue="" onChangeText={handleSearchCard} />
      </div>
      {foundStatus ? <CardsTable /> : <IsEmptyMessage />}
    </div>
  )
}
