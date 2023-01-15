import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setAppStatus } from '../../app/appSlice'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import {
  CreatePackPayloadType,
  DeletePackPayloadType,
  GetPacksPayloadType,
  packsAPI,
  PackType,
} from './packsAPI'

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
  page: 1,
  maxCardsCount: 1000,
  minCardsCount: 0,
  pageCount: 10,
} as initialStateType

type initialStateType = {
  packs: Array<PackType>
  cardPacksTotalCount?: number // количество колод
  maxCardsCount?: number
  minCardsCount?: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}

export const getPacks = createAsyncThunk(
  'packs/getPacks',
  async (payload: GetPacksPayloadType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await packsAPI.getPacks(payload)

      dispatch(setPacks(res.data.cardPacks))
      dispatch(setAppStatus('idle'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    }
  }
)

export const createPack = createAsyncThunk(
  'packs/createPack',
  async (payload: CreatePackPayloadType, { dispatch }) => {
    debugger
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.createPack(payload)
      dispatch(setAppStatus('idle'))
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
      dispatch(setAppStatus('idle'))
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
  },
})
export const { setPacks } = packsListSlice.actions
export const packsListReducer = packsListSlice.reducer
