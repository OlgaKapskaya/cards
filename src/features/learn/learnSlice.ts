import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from '../cards/cardsAPI'

const initialState = {
  currentCard: {} as CardType,
  grades: ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer'],
  isFirst: true,
  isShowAnswer: false,
  grade: 1,
}

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setCurrentCard: (state, action: PayloadAction<CardType>) => {
      state.currentCard = action.payload
    },
    setIsFirst: (state, action: PayloadAction<boolean>) => {
      state.isFirst = action.payload
    },
    setIsShowAnswer: (state, action: PayloadAction<boolean>) => {
      state.isShowAnswer = action.payload
    },
    setGrade: (state, action: PayloadAction<number>) => {
      state.grade = action.payload + 1
    },
  },
})

export const { setCurrentCard, setIsFirst, setIsShowAnswer, setGrade } = learnSlice.actions
export const learnReducer = learnSlice.reducer
