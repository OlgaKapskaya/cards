import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'
import { uniqueObjectsFromAnArray } from '../../common/utils/uniqueObjectsFromAnArray'

import {
  cardsAPI,
  CardType,
  CreateCardPayloadType,
  DeleteCardType,
  GetCardsPayloadType,
  UpdateCardPayloadType,
} from './cardsAPI'

export const getCards = createAsyncThunk(
  'cards/getCards',
  async (data: GetCardsPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      // убрать загулшку (количество страниц и карточек)
      const response = await cardsAPI.getCards({
        page: 1,
        pageCount: 10,
        ...data,
      })

      dispatch(setCards(response.data.cards))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const createCard = createAsyncThunk(
  'cards/createCard',
  async (data: CreateCardPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await cardsAPI.createCard(data)
      dispatch(getCards({ cardsPack_id: data.card.cardsPack_id }))
      dispatch(setAppMessage('New card created'))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (data: DeleteCardType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const response = await cardsAPI.deleteCard(data)

      dispatch(getCards({ cardsPack_id: response.data.deletedCard.cardsPack_id }))
      dispatch(setAppMessage('Card removed'))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (data: UpdateCardPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const response = await cardsAPI.updateCard(data)

      dispatch(getCards({ cardsPack_id: response.data.updatedCard.cardsPack_id }))
      dispatch(setAppMessage('Card update'))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const searchCards = createAsyncThunk(
  'cards/searchCards',
  async (data: GetCardsPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    const questionFilter = data.cardQuestion
    const answerFilter = data.cardAnswer

    try {
      // убрать загулшку (количество страниц и карточек)
      const responseQuestion = await cardsAPI.getCards({
        page: 1,
        pageCount: 10,
        cardsPack_id: data.cardsPack_id,
        cardQuestion: questionFilter,
      })
      const responseAnswer = await cardsAPI.getCards({
        page: 1,
        pageCount: 10,
        cardsPack_id: data.cardsPack_id,
        cardAnswer: answerFilter,
      })

      const resultResponse = uniqueObjectsFromAnArray(
        responseQuestion.data.cards,
        responseAnswer.data.cards
      )

      if (resultResponse.length === 0) {
        dispatch(setFoundStatus(false))
        dispatch(setAppMessage('There are no such cards'))
        dispatch(setAppStatus('failed'))
      } else {
        dispatch(setFoundStatus(true))
        dispatch(setAppMessage(null))
        dispatch(setAppStatus('succeeded'))
      }

      dispatch(setCards(resultResponse))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

const initialState = {
  cards: [] as CardType[],
  found: true,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
    setFoundStatus: (state, action: PayloadAction<boolean>) => {
      state.found = action.payload
    },
  },
})

export const { setCards, setFoundStatus } = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
