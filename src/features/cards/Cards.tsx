import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

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
} from '../../common'

import { ActiveCardsButton } from './cards-button/ActiveCardsButton'
import { CardsMenu } from './cards-menu/CardsMenu'
import { CardsTable } from './cards-table/CardsTable'
import s from './Cards.module.css'
import { getCards, setCardsPackId, setIsCardsLoaded, setSearchWord } from './cardsSlice'

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

  const { packId } = useParams<{ packId: string }>()

  useEffect(() => {
    dispatch(setCardsPackId(packId ? packId : ''))

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
