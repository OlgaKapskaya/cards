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
  const { page, pageCount, searchWord, sort } = state.cards.searchParams
  const cardsPack_id = state.cards.cardsPack_id

  // в thunk можжно return использовать?
  // if (cardsPack_id.length === 0) return
  if (cardsPack_id.length !== 0) {
    const params = {
      cardsPack_id,
      page,
      pageCount,
      cardQuestion: searchWord,
      sortCards: sort,
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
    dispatch(setIsCardsLoaded(true))
    dispatch(setCards(response.data.cards))
    dispatch(setUserPackId(response.data.packUserId))
    dispatch(setCardsTotalCount(response.data.cardsTotalCount))
    dispatch(setCardsPackName(response.data.packName))

      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
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
  cardsPack_id: '',
  userPack_id: '',
  packName: '',
  cardsTotalCount: 0,
  found: true,
  empty: true,
  searchParams: {
    page: 1,
    pageCount: 4,
    searchWord: '',
    sort: '0updated',
  },
  isCardsLoaded: false,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    },
    clearCards(state) {
      state.cards = []
      state.empty = true
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
    setCardsSort: (state, action: PayloadAction<string>) => {
      state.searchParams.sort = action.payload
    },
    setCardsPackName: (state, action: PayloadAction<string>) => {
      state.packName = action.payload
    },
    setIsCardsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isCardsLoaded = action.payload
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
  setCardsSort,
  setCardsPackName,
  clearCards,
  setIsCardsLoaded,
} = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
