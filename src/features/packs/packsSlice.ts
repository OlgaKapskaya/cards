import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import {
  CreatePackPayloadType,
  DeletePackPayloadType,
  GetPacksPayloadType,
  packsAPI,
  PackType,
  UpdatePackPayloadType,
} from './packsAPI'

import { setAppMessage, setAppStatus } from 'app/appSlice'
import { AppRootStateType } from 'app/store'
import { errorNetworkUtil } from 'common'

const initialState = {
  packs: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  isLoading: false,
  searchParams: {
    min: 0,
    max: 0,
    page: 1,
    pageCount: 7,
    packName: '',
    sortPacks: '0updated',
    user_id: '',
  },
} as initialStateType

type initialStateType = {
  packs: PackType[]
  cardPacksTotalCount?: number | undefined
  maxCardsCount?: number
  minCardsCount?: number
  isLoading: boolean
  searchParams: GetPacksPayloadType
}

export const getPacks = createAsyncThunk('packs/getPacks', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { page, pageCount, packName, sortPacks, min, max, user_id } = state.packs.searchParams

  const params: GetPacksPayloadType = {
    packName,
    min,
    max,
    page,
    pageCount,
    user_id,
    sortPacks,
  }

  dispatch(setAppStatus('loading'))
  dispatch(setIsLoading(true))
  try {
    const res = await packsAPI.getPacks(params)

    dispatch(
      setPacks(
        res.data.cardPacks.map(elem => {
          return {
            ...elem,
            created: dayjs(elem.created).format('DD.MM.YYYY HH:mm:ss'),
            updated: dayjs(elem.updated).format('DD.MM.YYYY HH:mm:ss'),
          }
        })
      )
    )
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
      dispatch(setAppMessage(`New pack created`))
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
      dispatch(setAppMessage(`Pack deleted`))
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
      dispatch(getPacks())
      dispatch(setAppMessage(`Pack updated`))
      dispatch(setAppStatus('succeeded'))
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
  dispatch(setUserId(''))
  dispatch(setCurrentPage(1))
})

export const setSearchParams = createAsyncThunk(
  'packs/setSearchParams',
  async (payload: any, { dispatch, getState }) => {
    const state = getState() as AppRootStateType
    const stateSearchParams = state.packs.searchParams
    const params = Object.fromEntries(payload)

    if (JSON.stringify(params) !== JSON.stringify(stateSearchParams)) {
      dispatch(setCurrentPage(+params.page || 1))
      dispatch(setPageCount(+params.pageCount || 4))
      dispatch(setPackName(params.packName || ''))
      dispatch(setSort(params.sortPacks))
      dispatch(setUserId(params.user_id) || '')
      dispatch(setRange([0, 0]))
    }
  }
)

export const packsSlice = createSlice({
  name: 'packs',
  initialState: initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setPacks(state, action: PayloadAction<PackType[]>) {
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
      state.searchParams.min = action.payload[0]
      state.searchParams.max = action.payload[1]
    },
    setSort(state, action: PayloadAction<string>) {
      state.searchParams.sortPacks = action.payload
    },
    setUserId(state, action: PayloadAction<string>) {
      state.searchParams.user_id = action.payload
    },
  },
})
export const {
  setPacks,
  setMinPacksCount,
  setMaxPacksCount,
  setCardPacksTotalCount,
  setCurrentPage,
  setPageCount,
  setRange,
  setPackName,
  setIsLoading,
  setSort,
  setUserId,
} = packsSlice.actions

export const packsReducer = packsSlice.reducer
