import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const me = createAsyncThunk('app/me', async () => {
  await appAPI.me()
})

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload
    },
  },
  extraReducers: builder => {
    builder

      .addCase(me.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(me.fulfilled, state => {
        state.isLoggedIn = true
        state.status = 'succeeded'
        state.isInitialized = true
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoggedIn = false
        state.status = 'failed'
        state.isInitialized = true
        state.error = action.error.message ? action.error.message : 'Some error occurred'
      })
  },
})
export const { setAppError, setAppStatus, setAppInitialized } = appSlice.actions
