import React from 'react'

import { ButtonComponent } from '../../common/components/button/ButtonComponent'
import { sxButtonMarginTopWidthCreator } from '../../common/utils/styles-utils/sxButtonCreators'
import { ProfileBackLink } from '../profile/profile-back-link/ProfileBackLink'

import { CardsMenu } from './cards-menu/CardsMenu'
import s from './Cards.module.css'

export const Cards = () => {
  return (
    <div className={s.cardsPage}>
      <ProfileBackLink />
      <div className={s.titleMenu}>
        <CardsMenu />
        <ButtonComponent sx={sxButtonMarginTopWidthCreator('0', '184px')}>
          Add new card
        </ButtonComponent>
      </div>
    </div>
  )
}
