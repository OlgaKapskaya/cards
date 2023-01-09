import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { errorNetworkUtil } from '../common/utils/errorNetworkUtil'
import { setUserData } from '../features/Profile/profileSlice'

import { appAPI } from './appAPI'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface AppStateType {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
  isLoggedIn: boolean
}

const initialState = {
  status: 'idle',
  error: null,
  isInitialized: false,
  isLoggedIn: false,
} as AppStateType

export const me = createAsyncThunk('app/me', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const response = await appAPI.me()

    dispatch(setAppLogged(true))
    dispatch(setUserData(response.data.data))
    dispatch(setAppStatus('succeeded'))
  } catch (e: any) {
    dispatch(setAppLogged(false))
    errorNetworkUtil(dispatch, e)
  } finally {
    dispatch(setAppInitialized(true))
  }
})

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    },
    setAppLogged(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})
export const { setAppError, setAppStatus, setAppInitialized, setAppLogged } = appSlice.actions
export const appReducer = appSlice.reducer
