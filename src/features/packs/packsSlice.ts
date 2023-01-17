import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { AppRootStateType } from '../../app/store'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import {
  CreatePackPayloadType,
  DeletePackPayloadType,
  GetPacksPayloadType,
  packsAPI,
  PackType,
  UpdatePackPayloadType,
} from './packsAPI'

type SearchParamsType = {
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  packName: string
  range: number[]
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
  isOnlyMy: false,
  isLoading: false,
  searchParams: {
    page: 1,
    pageCount: 4,
    packName: '',
    range: [] as number[],
  },
} as initialStateType

type initialStateType = {
  packs: Array<PackType>
  cardPacksTotalCount?: number | undefined
  maxCardsCount?: number
  minCardsCount?: number
  isOnlyMy: boolean
  isLoading: boolean
  searchParams: SearchParamsType
}

export const getPacks = createAsyncThunk('packs/getPacks', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { page, pageCount, packName, range } = state.packs.searchParams
  const user_id = state.profile.profile._id
  const isOnlyMy = state.packs.isOnlyMy

  const params: GetPacksPayloadType = {
    packName,
    min: range[0],
    max: range[1],
    page,
    pageCount,
    user_id: isOnlyMy ? user_id : '',
  }

  dispatch(setAppStatus('loading'))
  dispatch(setIsLoading(true))
  try {
    const res = await packsAPI.getPacks(params)

    dispatch(setPacks(res.data.cardPacks))
    dispatch(setMinPacksCount(res.data.minCardsCount))
    dispatch(setMaxPacksCount(res.data.maxCardsCount))
    dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
    dispatch(setAppStatus('succeeded'))
  } catch (e) {
    errorNetworkUtil(dispatch, e)
  } finally {
    dispatch(setIsLoading(false))
  }
})

export const createPack = createAsyncThunk(
  'packs/createPack',
  async (payload: CreatePackPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.createPack(payload)
      dispatch(getPacks())
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
      dispatch(getPacks())
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const updatePack = createAsyncThunk(
  'packs/updatePack',
  async (payload: UpdatePackPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.updatePack(payload)
      dispatch(setAppStatus('succeeded'))
      dispatch(getPacks())
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const resetFilters = createAsyncThunk('packs/resetFilters', async (_, { dispatch }) => {
  dispatch(setMinPacksCount(0))
  dispatch(setMaxPacksCount(0))
  dispatch(setRange([] as number[]))
  dispatch(setPackName(''))
  dispatch(setCurrentPage(1))
})

export const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
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
    setRange(state, action: PayloadAction<number[]>) {
      state.searchParams.range = action.payload
    },
    setTypePacks(state, action: PayloadAction<boolean>) {
      state.isOnlyMy = action.payload
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
  setRange,
  setPackName,
  setIsLoading,
} = packsSlice.actions
export const packsReducer = packsSlice.reducer
