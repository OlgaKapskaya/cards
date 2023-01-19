import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import { setAppMessage, setAppStatus } from '../../app/appSlice'
import { AppRootStateType } from '../../app/store'
import { errorNetworkUtil } from '../../common/utils/errorNetworkUtil'

import {
  CreatePackPayloadType,
  DeletePackPayloadType,
  GetPacksPayloadType,
  packsAPI,
  UpdatePackPayloadType,
} from './packsAPI'

type SearchParamsType = {
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
  packName?: string
  min?: number
  max?: number
  sort: string
  user_id?: string
}
export type PackDomainType = {
  user_name: string
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  onEdited: boolean
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
    pageCount: 7,
    packName: '',
    sort: '0updated',
    user_id: '',
  },
} as initialStateType

type initialStateType = {
  packs: PackDomainType[]
  cardPacksTotalCount?: number | undefined
  maxCardsCount?: number
  minCardsCount?: number
  isOnlyMy: boolean
  isLoading: boolean
  searchParams: SearchParamsType
}

export const getPacks = createAsyncThunk('packs/getPacks', async (_, { dispatch, getState }) => {
  const state = getState() as AppRootStateType
  const { page, pageCount, packName, sort, min, max, user_id } = state.packs.searchParams

  console.log(user_id)
  const params: GetPacksPayloadType = {
    packName,
    min,
    max,
    page,
    pageCount,
    user_id,
    sortPacks: sort,
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
            created: dayjs(elem.created).format('DD.MM.YYYY'),
            updated: dayjs(elem.updated).format('DD.MM.YYYY'),
            onEdited: false,
          }
        })
      )
    )
    dispatch(setMinPacksCount(res.data.minCardsCount))
    dispatch(setMaxPacksCount(res.data.maxCardsCount))
    dispatch(setCardPacksTotalCount(res.data.cardPacksTotalCount))
    dispatch(setAppMessage(null))
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
    dispatch(setEdited({ id: payload.id, onEdited: true }))
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
    dispatch(setEdited({ id: payload.cardsPack._id, onEdited: true }))
    dispatch(setAppStatus('loading'))
    try {
      await packsAPI.updatePack(payload)

      dispatch(getPacks())
      // для обновления имени pack в карточках при edit
      // можем ли мы использовать setTimeout в thunk и как его чистить
      // setTimeout(() => dispatch(getCards()), 700)

      dispatch(setAppMessage(`Pack updated`))
      dispatch(setAppStatus('succeeded'))
    } catch (e) {
      errorNetworkUtil(dispatch, e)
    } finally {
      dispatch(setEdited({ id: payload.cardsPack._id, onEdited: false }))
    }
  }
)

export const resetFilters = createAsyncThunk('packs/resetFilters', async (_, { dispatch }) => {
  dispatch(setMinPacksCount(0))
  dispatch(setMaxPacksCount(0))
  dispatch(setRange([] as number[]))
  dispatch(setPackName(''))
  dispatch(setTypePacks(false))
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
    setPacks(state, action: PayloadAction<PackDomainType[]>) {
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
    setTypePacks(state, action: PayloadAction<boolean>) {
      state.isOnlyMy = action.payload
    },
    setSort(state, action: PayloadAction<string>) {
      state.searchParams.sort = action.payload
    },
    setUserId(state, action: PayloadAction<string>) {
      state.searchParams.user_id = action.payload
    },
    setEdited(state, action: PayloadAction<{ id: string; onEdited: boolean }>) {
      state.packs = state.packs.map(elem =>
        elem._id === action.payload.id
          ? {
              ...elem,
              onEdited: action.payload.onEdited,
            }
          : elem
      )
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
  setSort,
  setEdited,
  setUserId,
} = packsSlice.actions
export const packsReducer = packsSlice.reducer
