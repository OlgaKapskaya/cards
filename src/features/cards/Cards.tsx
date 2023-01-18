import React, { useEffect } from 'react'

import { BackPackLink } from '../../common/components/back-pack-link/BackPackLink'
import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { IsEmptyMessage } from '../../common/components/is-empty-message/IsEmptyMessage'
import { SearchInput } from '../../common/components/search-input/SearchInput'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { appStatusSelector } from '../../common/selectors/appSelectors'
import {
  emptySelector,
  foundSelector,
  searchParamsSelector,
} from '../../common/selectors/cardsSelectors'
import { sxButtonMarginTopWidthCreator } from '../../common/utils/styles-utils/sxButtonCreators'

import { CardsMenu } from './cards-menu/CardsMenu'
import { CardsTable } from './cards-table/CardsTable'
import s from './Cards.module.css'
import { createCard, getCards, setSearchWord } from './cardsSlice'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const foundStatus = useAppSelector(foundSelector)
  const emptyStatus = useAppSelector(emptySelector)
  const searchParams = useAppSelector(searchParamsSelector)
  const loadingStatus = useAppSelector(appStatusSelector)

  const handleAddNewCard = () => {
    // убрать заглушку
    const payload = {
      question: 'create new question',
      answer: 'new answer',
      grade: Math.floor(Math.random() * 5),
    }

    dispatch(createCard(payload))
  }

  const handleSearchCard = (value: string) => {
    dispatch(setSearchWord(value))
  }
  //сделать усеЕффект который будет доставть из урл айди пака

  useEffect(() => {
    // убрать заглушку
    dispatch(getCards())
  }, [searchParams])

  if (emptyStatus) {
    return (
      <div className={s.cardsPage}>
        <BackPackLink />
        <CardsMenu />
        <IsEmptyMessage message="This pack is empty. Click add new card to fill this pack">
          <ButtonComponent
            sx={sxButtonMarginTopWidthCreator('0', '184px')}
            onClick={handleAddNewCard}
          >
            Add new card
          </ButtonComponent>
        </IsEmptyMessage>
      </div>
    )
  }

  return (
    <div className={s.cardsPage}>
      <BackPackLink />
      <div className={s.titleMenu}>
        <CardsMenu />
        <ButtonComponent
          sx={sxButtonMarginTopWidthCreator('0', '184px')}
          onClick={handleAddNewCard}
          disabled={loadingStatus === 'loading'}
        >
          Add new card
        </ButtonComponent>
      </div>
      <div className={s.searchBlock}>
        <SearchInput label="Search" searchValue="" onChangeText={handleSearchCard} />
      </div>
      {foundStatus ? <CardsTable /> : <IsEmptyMessage />}
    </div>
  )
}
