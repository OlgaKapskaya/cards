import React from 'react'

import TextField from '@mui/material/TextField'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { useAppDispatch } from '../../common/hooks/reactReduxHooks'
import { sxButtonMarginTopWidthCreator } from '../../common/utils/styles-utils/sxButtonCreators'
import { ProfileBackLink } from '../profile/profile-back-link/ProfileBackLink'

import { CardsMenu } from './cards-menu/CardsMenu'
import s from './Cards.module.css'
import { createCard } from './cardsSlice'
import { EnhancedTable } from './table/Table'

export const Cards = () => {
  const dispatch = useAppDispatch()

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
        <div>Search</div>
        <TextField
          variant="outlined"
          label="Provide your text"
          size="small"
          sx={{ width: '100%', height: '36px' }}
        />
      </div>
      <EnhancedTable />
    </div>
  )
}
