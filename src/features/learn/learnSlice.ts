import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { learnAPI, SetGradePayloadType } from './learnAPI'

import { setAppStatus } from 'app/appSlice'
import { AppRootStateType } from 'app/store'
import { errorNetworkUtil } from 'common'
import { CardType } from 'features/cards/cardsAPI'
import { setCards } from 'features/cards/cardsSlice'

export const upgradeGrade = createAsyncThunk(
  'learn/upgradeGrade',
  async (_, { dispatch, getState }) => {
    dispatch(setAppStatus('loading'))
    try {
      const state = getState() as AppRootStateType
      const card_id = state.learn.currentCard._id
      const grade = state.learn.grade
      const cards = state.cards.cards

      const payload: SetGradePayloadType = { card_id, grade }
      const response = await learnAPI.setGrade(payload)

      dispatch(
        setCards(
          cards.map(elem =>
            elem._id === response.data.updatedGrade.card_id
              ? {
                  ...elem,
                  grade: response.data.updatedGrade.grade,
                  shots: response.data.updatedGrade.shots,
                }
              : elem
          )
        )
      )
      dispatch(setIsShowAnswer(false))
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

const initialState = {
  currentCard: {} as CardType,
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
      state.grade = action.payload
    },
  },
})

export const { setCurrentCard, setIsFirst, setIsShowAnswer, setGrade } = learnSlice.actions
export const learnReducer = learnSlice.reducer
