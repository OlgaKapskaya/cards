import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RequestStatusType, setAppStatus } from '../../app/appSlice'
import { AppDispatch, AppRootStateType } from '../../app/store'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import {
  CreatePackPayloadType,
  DeletePackPayloadType,
  GetPacksPayloadType,
  GetPacksResponseType,
  packsAPI,
  PackType,
} from './packsAPI'

export type TypePacks = 'My' | 'All'
type SearchParamsType = {
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  packName: string
  user_id: string
  min: number
  max: number
}
export type CardType = {
  cardsCount: number
  created: Date
  deckCover: null | any
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: Date
  user_id: string
  user_name: string
  __v: number
  _id: string
  sortCards: string
}

const initialState = {
  packs: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  typePacks: 'All',
  searchParams: {
    page: 1, // выбранная страница
    pageCount: 4, // количество элементов на странице
    packName: '',
    user_id: '',
    min: 0,
    max: 0,
  },
} as initialStateType

type initialStateType = {
  packs: Array<PackType>
  cardPacksTotalCount?: number // количество колод
  maxCardsCount?: number
  minCardsCount?: number
  typePacks: TypePacks
  searchParams: SearchParamsType
}

export const getPacks = createAsyncThunk('packs/getPacks', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { page, pageCount, packName, min, max } = state.packsList.searchParams
  const params: GetPacksPayloadType = {
    packName,
    min,
    max,
    page,
    pageCount,
  }

  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.getPacks(params)

    dispatch(setPacks(res.data.cardPacks))
    dispatch(setMinPacksCount(res.data.minCardsCount))
    dispatch(setMaxPacksCount(res.data.maxCardsCount))
    dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
    dispatch(setAppStatus('succeeded'))
  } catch (e) {
    errorNetworkUtil(dispatch, e)
  }
})

export const createPack = createAsyncThunk(
  'packs/createPack',
  async (payload: CreatePackPayloadType, { dispatch }) => {
    debugger
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.createPack(payload)
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const deletePack = createAsyncThunk(
  'packs/deletePack',
  async (payload: DeletePackPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.deletePack(payload)
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)
export const packsListSlice = createSlice({
  name: 'packsList',
  initialState: initialState,
  reducers: {
    setPacks(state, action: PayloadAction<Array<PackType>>) {
      state.packs = action.payload
    },
    setMinPacksCount(state, action: PayloadAction<number>) {
      state.minCardsCount = action.payload
    },
    setMaxPacksCount(state, action: PayloadAction<number>) {
      state.maxCardsCount = action.payload
    },
    setCardPacksTotalCount(state, action: PayloadAction<number>) {
      state.cardPacksTotalCount = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.searchParams.page = action.payload
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.searchParams.pageCount = action.payload
    },
    setPackName(state, action: PayloadAction<string>) {
      state.searchParams.packName = action.payload
    },
    setMaxCount(state, action: PayloadAction<number>) {
      state.searchParams.max = action.payload
    },
    setMinCount(state, action: PayloadAction<number>) {
      state.searchParams.min = action.payload
    },
    setTypePacks(state, action: PayloadAction<TypePacks>) {
      state.typePacks = action.payload
    },
  },
})
export const {
  setPacks,
  setTypePacks,
  setMinPacksCount,
  setMaxPacksCount,
  setCardPacksTotalCount,
  setCurrentPage,
  setPageCount,
  setMinCount,
  setMaxCount,
  setPackName,
} = packsListSlice.actions
export const packsListReducer = packsListSlice.reducer
