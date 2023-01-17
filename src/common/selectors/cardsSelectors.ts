import { AppRootStateType } from '../../app/store'

export const cardsSelector = (state: AppRootStateType) => state.cards.cards
export const foundSelector = (state: AppRootStateType) => state.cards.found
