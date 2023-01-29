import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ActiveCardsButton } from './cards-button/ActiveCardsButton'
import { CardsMenu } from './cards-menu/CardsMenu'
import { CardsTable } from './cards-table/CardsTable'
import s from './Cards.module.css'
import { getCards, setIsCardsLoaded, setSearchWord, setUrlPackParams } from './cardsSlice'

import {
  BackPackLink,
  cardsSearchParamsSelector,
  emptySelector,
  foundSelector,
  isCardLoadedSelector,
  IsEmptyMessage,
  Loader,
  SearchInput,
  useAppDispatch,
  useAppSelector,
  userCardsPackIdSelector,
  userIDSelector,
} from 'common'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const foundStatus = useAppSelector(foundSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const searchParams = useAppSelector(cardsSearchParamsSelector)
  const userId = useAppSelector(userCardsPackIdSelector)
  const profileId = useAppSelector(userIDSelector)
  const isCardsLoaded = useAppSelector(isCardLoadedSelector)

  const isMy = userId === profileId
  const emptyMessage = isMy
    ? 'This pack is empty. Click add new card to fill this pack'
    : 'This pack is empty. Click back to packs list'

  const handleSearchCard = (value: string) => {
    dispatch(setSearchWord(value))
  }

  const [urlParams] = useSearchParams()
  const { packId, packPrivate } = Object.fromEntries(urlParams)

  useEffect(() => {
    const payload = {
      packId: packId ? packId : '',
      packPrivate: packPrivate === 'true',
    }

    dispatch(setUrlPackParams(payload))

    return () => {
      dispatch(setIsCardsLoaded(false))
    }
  }, [])

  useEffect(() => {
    dispatch(getCards())
  }, [searchParams])

  if (!isCardsLoaded) {
    return <Loader />
  }
  if (emptyStatus) {
    return (
      <div className={s.cardsPage}>
        <BackPackLink />
        <div className={s.titleMenu}>
          <CardsMenu />
        </div>
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
