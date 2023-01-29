import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { DeletePackPayloadType, packsAPI, UpdatePackPayloadType } from '../packs/packsAPI'

import { cardsAPI, CardType, DeleteCardType, UpdateCardPayloadType } from './cardsAPI'

import { setAppMessage, setAppStatus } from 'app/appSlice'
import { AppRootStateType } from 'app/store'
import { errorNetworkUtil } from 'common'

export type CreateCardDataType = {
  answer?: string
  question?: string
  grade?: number
}

export const getCards = createAsyncThunk('cards/getCards', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { page, pageCount, searchWord, sort } = state.cards.searchParams
  const cardsPack_id = state.cards.cardsPack_id

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

      // при удалении последнего эелемента таблицы не на последней странице
      // чтобы перекидывало на страницу вниз
      if (response.data.cards.length === 0 && params.page !== 1) {
        dispatch(setCardsCurrentPage(params.page - 1))
      }

      dispatch(setIsCardsLoaded(true))
      dispatch(
        setCards(
          response.data.cards.map(elem => {
            return {
              ...elem,
              created: dayjs(elem.created).format('DD.MM.YYYY HH:mm:ss'),
              updated: dayjs(elem.updated).format('DD.MM.YYYY HH:mm:ss'),
            }
          })
        )
      )

      dispatch(setUserPackId(response.data.packUserId))
      dispatch(setCardsTotalCount(response.data.cardsTotalCount))
      dispatch(setCardsPackName(response.data.packName))
      dispatch(setPackDeckCover(response.data.packDeckCover))

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
      dispatch(setAppMessage('Card deleted'))
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
      dispatch(setAppMessage('Card updated'))
      dispatch(setAppStatus('succeeded'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const updateCardPack = createAsyncThunk(
  'cards/updateCardPack',
  async (data: UpdatePackPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.updatePack(data)
      dispatch(getCards())
      dispatch(setAppMessage('Pack updated'))
    } catch (e: any) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const deleteCardPack = createAsyncThunk(
  'cards/deleteCardPack',
  async (data: DeletePackPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.deletePack(data)

      dispatch(setAppMessage(`Pack deleted`))
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

const initialState = {
  cards: [] as CardType[],
  userPack_id: '',
  cardsPack_id: '',
  packPrivate: false,
  packName: '',
  packDeckCover: '',
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
    setPrivateStatus: (state, action: PayloadAction<boolean>) => {
      state.packPrivate = action.payload
    },
    setUrlPackParams: (state, action: PayloadAction<{ packId: string; packPrivate: boolean }>) => {
      state.cardsPack_id = action.payload.packId
      state.packPrivate = action.payload.packPrivate
    },
    setPackDeckCover: (state, action: PayloadAction<string>) => {
      state.packDeckCover = action.payload
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
  setIsCardsLoaded,
  setPrivateStatus,
  setUrlPackParams,
  setPackDeckCover,
} = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
