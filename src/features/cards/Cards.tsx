import React from 'react'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { SearchInput } from '../../common/components/search-input/SearchInput'
import { useAppDispatch, useAppSelector } from '../../common/hooks/reactReduxHooks'
import { foundSelector } from '../../common/selectors/cardsSelectors'
import { sxButtonMarginTopWidthCreator } from '../../common/utils/styles-utils/sxButtonCreators'
import { ProfileBackLink } from '../profile/profile-back-link/ProfileBackLink'

import { CardsMenu } from './cards-menu/CardsMenu'
import s from './Cards.module.css'
import { createCard, searchCards } from './cardsSlice'
import { EnhancedTable } from './table/Table'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const foundStatus = useAppSelector(foundSelector)

  const handleAddNewCard = () => {
    // убрать заглушку
    const payload = {
      card: {
        cardsPack_id: '63c416a4025403b6ce37c1d1',
        question: 'create new question',
        answer: 'new answer',
        grade: Math.floor(Math.random() * 5),
      },
    }

    dispatch(createCard(payload))
  }

  const handleSearchCard = (value: string) => {
    // убрать загулшку
    const payload = {
      cardsPack_id: '63c416a4025403b6ce37c1d1',
      cardQuestion: value,
      cardAnswer: value,
    }

    dispatch(searchCards(payload))
  }

  return (
    <div className={s.cardsPage}>
      <ProfileBackLink />
      <div className={s.titleMenu}>
        <CardsMenu />
        <ButtonComponent
          sx={sxButtonMarginTopWidthCreator('0', '184px')}
          onClick={handleAddNewCard}
        >
          Add new card
        </ButtonComponent>
      </div>
      <div className={s.searchBlock}>
        <SearchInput label="Search" searchValue="" onChangeText={handleSearchCard} />
      </div>
      {foundStatus ? <EnhancedTable /> : <div>НИЧЕГО НЕ НАЙДЕНО</div>}
    </div>
  )
}
