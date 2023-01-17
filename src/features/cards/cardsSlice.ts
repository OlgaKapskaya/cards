import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppMessage, setAppStatus } from '../../app/appSlice'
import { AppRootStateType } from '../../app/store'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import { cardsAPI, CardType, DeleteCardType, UpdateCardPayloadType } from './cardsAPI'

export type CreateCardDataType = {
  answer?: string
  question?: string
  grade?: number
}

export const getCards = createAsyncThunk('cards/getCards', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { page, pageCount, searchWord } = state.cards.searchParams
  const cardsPack_id = state.cards.cardsPack_id

  const params = {
    cardsPack_id,
    page,
    pageCount,
    cardQuestion: searchWord,
  }

  dispatch(setAppStatus('loading'))
  try {
    // убрать загулшку (количество страниц и карточек)
    const response = await cardsAPI.getCards(params)

    if (response.data.cards.length === 0 && params.page === 1) {
      if (params.cardQuestion.length === 0) {
        dispatch(setEmptyStatus(true))
      } else {
        dispatch(setFoundStatus(false))
      }
    } else {
      dispatch(setEmptyStatus(false))
      dispatch(setFoundStatus(true))
    }

    dispatch(setCards(response.data.cards))
    dispatch(setUserPackId(response.data.packUserId))
    dispatch(setCardsTotalCount(response.data.cardsTotalCount))

    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    errorNetworkUtil(dispatch, e)
  }
})

export const createCard = createAsyncThunk(
  'cards/createCard',
  async (data: CreateCardDataType, { dispatch, getState }) => {
    const state = getState() as AppRootStateType
    const cardsPack_id = state.cards.cardsPack_id

    dispatch(setAppStatus('loading'))
    try {
      await cardsAPI.createCard({ card: { ...data, cardsPack_id } })
      dispatch(getCards())
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
      await cardsAPI.deleteCard(data)

      dispatch(getCards())
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
      await cardsAPI.updateCard(data)

      dispatch(getCards())
      dispatch(setAppMessage('Card update'))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

const initialState = {
  cards: [] as CardType[],
  cardsPack_id: '63c416a4025403b6ce37c1d1',
  userPack_id: '',
  cardsTotalCount: 0,
  found: true,
  empty: false,
  searchParams: {
    page: 1,
    pageCount: 4,
    searchWord: '',
  },
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
    setEmptyStatus: (state, action: PayloadAction<boolean>) => {
      state.empty = action.payload
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchParams.searchWord = action.payload
    },
    setCardsPackId: (state, action: PayloadAction<string>) => {
      state.cardsPack_id = action.payload
    },
    setUserPackId: (state, action: PayloadAction<string>) => {
      state.userPack_id = action.payload
    },
    setCardsCurrentPage: (state, action: PayloadAction<number>) => {
      state.searchParams.page = action.payload
    },
    setCardsPageCount: (state, action: PayloadAction<number>) => {
      state.searchParams.pageCount = action.payload
    },
    setCardsTotalCount: (state, action: PayloadAction<number>) => {
      state.cardsTotalCount = action.payload
    },
  },
})

export const {
  setCards,
  setFoundStatus,
  setEmptyStatus,
  setSearchWord,
  setCardsPackId,
  setUserPackId,
  setCardsCurrentPage,
  setCardsPageCount,
  setCardsTotalCount,
} = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
